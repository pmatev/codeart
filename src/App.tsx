import Sketch from "react-p5";
import p5Types from "p5";
import chroma from "chroma-js";


type Point = {
  x: number;
  y: number;
  color: p5Types.Color;
};


function getRange(hexColor: string) {
  const end = "#fff";
  return [
    chroma(hexColor)
      .darken(1.4)
      .hex(),
    hexColor,
    end
  ];
}




export default function App() {
  let t: number = 0; // eslint-disable-line @typescript-eslint/no-unused-vars
  const numberOfColors = 5;
  const primaryColor = '#30B0F0';

  const colors: string[] = chroma
      .scale(getRange(primaryColor))
      .mode("lch")
      .colors(numberOfColors);

  let buffer: Point[] = [];

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(800, 800);
    p5.frameRate(30);
  }

  function draw(p5: p5Types) {
    t++;

    p5.clear();
    p5.background("black");
    p5.noFill();
    p5.noStroke();

    const noise =

    buffer.push({
      x: p5.mouseX + 20 * p5.noise(t, t),
      y: p5.mouseY + 20 * p5.noise(t + 1, t + 1),
      color: p5.color(colors[t % colors.length]),
    });

    buffer.forEach((b, i) => {
      b.color.setAlpha(i * 25);
      p5.fill(b.color);
      p5.ellipse(b.x, b.y, 3, 3);
    });

    if (buffer.length > 10) {
      buffer.shift();
    }
  }

  return <Sketch setup={setup} draw={draw} />;
}
