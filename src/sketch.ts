export interface Sketch {
  setup(app: PIXI.Application): void;
  draw(deltaTime: number): void;
}
