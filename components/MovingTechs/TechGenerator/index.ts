import Tech from '../Tech';

export default class TechGenerator {
  ctx: CanvasRenderingContext2D;
  canvasWidth: number;
  canvasHeight: number;
  size: number;
  techs: any[];
  techsPath: { path: string; name: string }[];

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number,
    techsPath: { path: string; name: string }[]
  ) {
    (this.ctx = ctx), (this.canvasWidth = canvasWidth);
    this.canvasHeight = canvasHeight;
    this.size = Math.min(Math.max(60, window.innerWidth / 5), 100);
    this.techs = [];
    this.techsPath = techsPath;
  }

  generate() {
    this.techsPath.forEach((tech) =>
      this.techs.push(new Tech(this, tech.path, tech.name))
    );
  }

  update() {
    this.techs.forEach((tech) => tech.update());
  }

  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.size = Math.min(Math.max(60, window.innerWidth / 5), 100);

    this.techs.forEach((tech) => tech.resizing());
  }

  init(cnv: HTMLCanvasElement) {
    cnv.addEventListener('mouseenter', () => {
      let line = 1;
      this.techs.forEach((item, index) => {
        let howMany = Math.floor(this.canvasWidth / this.size);
        if (howMany > this.techsPath.length) howMany = this.techsPath.length;
        const t1 = Math.floor(this.canvasWidth / howMany);
        const t2 = Math.floor(t1 - this.size) / 2 + 5;
        const width = t1;
        if (index === howMany * line) {
          line = line + 1;
        }

        let idx = line === 1 ? index : index - howMany * (line - 1);
        item.static(
          true,
          idx === 0 ? t2 : idx * width + t2,
          (line - 1) * this.size + 20
        );
      });
    });
    cnv.addEventListener('mouseleave', () => {
      this.techs.forEach((item) => item.static(false));
    });
  }
}
