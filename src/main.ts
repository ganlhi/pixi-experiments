import 'pixi.js';
import { Sketch } from './sketch';
import { Circle } from './sketches/circle';

const sketches = new Map<string, Sketch>([['Circle', new Circle()]]);

/**
 * Build app
 */
const el: HTMLElement | null = document.querySelector('#container');
if (el === null) {
  throw new Error('NO CONTAINER!!!');
}
const app = new PIXI.Application({ antialias: true });

el.appendChild(app.view);

const hash = location.hash.slice(1);

/**
 * Sketch selector
 */
const selector: HTMLSelectElement | null = document.querySelector('select');
if (selector !== null) {
  Array.from(sketches.keys()).forEach(sketch => {
    const opt = document.createElement('option');

    opt.setAttribute('value', sketch);
    opt.innerText = sketch;

    if (hash === sketch) {
      opt.setAttribute('selected', 'selected');
    }

    selector.appendChild(opt);
  });
  selector.addEventListener('change', () => onChangeSketch(selector.value));

  if (sketches.has(hash)) {
    onChangeSketch(hash);
  }
}

let currentSketch: Sketch | undefined = undefined;

function onChangeSketch(sketchName: string) {
  if (currentSketch !== undefined) {
    app.stage.removeAllListeners();
    app.stage.removeChildren();
    app.ticker.remove(currentSketch.draw);
  }

  location.hash = sketchName;
  currentSketch = sketches.get(sketchName);
  if (currentSketch) {
    currentSketch.setup(app);
    app.ticker.add(currentSketch.draw.bind(currentSketch));
  }
}
