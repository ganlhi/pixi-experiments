import { Sketch } from 'src/sketch';

export class Circle implements Sketch {
  setup(app: PIXI.Application): void {
    const [x, y] = this.translateCoordinates(app.view, [0, 0]);
    const circle = new PIXI.Graphics();
    circle.beginFill(0xffef00);
    circle.drawCircle(x, y, 20);
    circle.endFill();
    app.stage.addChild(circle);
  }

  draw(deltaTime: number): void {}

  translateCoordinates(
    view: HTMLCanvasElement,
    fromCenter: [number, number],
  ): [number, number] {
    return [view.width / 2 + fromCenter[0], view.height / 2 + fromCenter[1]];
  }
}
