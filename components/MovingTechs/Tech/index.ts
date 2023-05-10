/** @type {HTMLCanvasElement} */

// const focusSize = 150;
// const originalSize = window.innerWidth / 10;

export default class Tech {
  generator: any;
  name: string;
  img: any;
  size: number;
  x: number;
  y: number;
  speed: number;
  vx: number;
  vy: number;
  originals: {
    x: number;
    y: number;
  };
  isStatic: boolean;
  isFocus: boolean;
  fraction: number;
  ease: number;
  originalSize: number;
  focusSize: number;

  constructor(generator: any, imagePath: string, name: string) {
    this.generator = generator;
    this.name = name;
    this.size = generator.size;
    this.x = Math.floor(
      Math.random() * (this.generator.canvasWidth - this.size)
    );
    this.y = Math.floor(
      Math.random() * (this.generator.canvasHeight - this.size)
    );
    this.speed = 5;
    this.vx = Math.random() * this.speed - this.speed / 2;
    this.vy = Math.random() * this.speed - this.speed / 2;
    this.img = new Image();
    this.img.src = imagePath;
    this.originals = {
      x: 0,
      y: 0,
    };
    this.isStatic = false;
    this.isFocus = false;

    this.originalSize = Math.min(Math.max(60, window.innerWidth / 5), 100);
    this.focusSize = this.size + 50;

    this.fraction = 0.9;
    this.ease = 0.1;
    this.init();
  }

  draw() {
    if (this.isFocus) {
      this.generator.ctx.globalCompositeOperation = 'source-over';
    } else {
      this.generator.ctx.globalCompositeOperation = 'destination-over';
    }
    this.generator.ctx.drawImage(
      this.img,
      this.x,
      this.y,
      this.size,
      this.size
    );
  }

  update() {
    if (this.isStatic) {
      this.x +=
        (this.vx *= this.fraction) + (this.originals.x - this.x) * this.ease;
      this.y +=
        (this.vy *= this.fraction) + (this.originals.y - this.y) * this.ease;

      if (this.isFocus && this.size < this.focusSize) {
        this.size += 10;
        this.x--;
        this.y++;
      }
    } else {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x > this.generator.canvasWidth - this.size || this.x <= 0) {
        this.vx *= -1;
      }
      if (this.y > this.generator.canvasHeight - this.size || this.y <= 0) {
        this.vy *= -1;
      }
    }

    if (!this.isFocus && this.size >= this.originalSize) {
      this.size -= 10;
    }

    this.draw();
  }

  static(isStatic: boolean, x: number, y: number, focus: boolean) {
    if (isStatic) {
      this.originals.x = x;
      this.originals.y = y;
      this.isStatic = true;
    } else {
      this.vx = Math.random() * this.speed - this.speed / 2;
      this.vy = Math.random() * this.speed - this.speed / 2;
      this.isStatic = false;
    }

    if (focus) {
      this.isFocus = true;
    } else {
      this.isFocus = false;
    }
  }

  resizing() {
    this.originalSize = Math.min(Math.max(60, window.innerWidth / 5), 100);
    this.size = Math.min(Math.max(60, window.innerWidth / 5), 100);

    this.focusSize = this.size + 50;

    if (this.x + this.size > this.generator.canvasWidth) {
      this.x = this.generator.canvasWidth - this.size;
    }
    if (this.y + this.size > this.generator.canvasHeight) {
      this.y = this.generator.canvasHeight - this.size;
    }
  }

  init() {
    const text = document.getElementById(this.name);
    text?.addEventListener('mouseenter', () => {
      this.static(
        true,
        (this.originals.x =
          this.generator.canvasWidth / 2 - this.focusSize / 2),
        (this.originals.y = 0),
        true
      );
    });

    text?.addEventListener('mouseleave', () => {
      this.static(false, 0, 0, false);
    });
  }
}
