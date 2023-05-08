class Particle {
  effect: any;
  x: number;
  y: number;
  color: string;
  originX: number;
  originY: number;
  size: number;
  dx: number;
  dy: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;
  ease: number;

  constructor(effect: any, x: number, y: number, color: string) {
    this.effect = effect;
    this.x = 0;
    this.y = Math.random() * effect.width;
    this.color = color;
    this.originX = x;
    this.originY = y;
    this.size = this.effect.gap;
    this.dx = 0;
    this.dy = 0;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = Math.random() * 0.6 + 0.15;
    this.ease = Math.random() * 0.1 + 0.05;
  }

  draw() {
    this.effect.c.fillStyle = this.color;
    this.effect.c.fillRect(this.x, this.y, this.size, this.size);
  }

  update() {
    this.x += (this.originX - this.x) * this.ease;
    this.y += (this.originY - this.y) * this.ease;
  }
}

export default Particle;
