import Sketch from "react-p5";
import p5Types from "p5";
import chroma from "chroma-js";


type Point = {
  x1: number;
  x2: number;
  x3: number;
  x4: number;
  y1: number;
  y2: number;
  y3: number;
  y4: number;
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

  const numberOfColors = 3;
  const primaryColor = '#30B0F0';
  const width = 800;
  const trailLength = 100;

  const colors: string[] = chroma
      .scale(getRange(primaryColor))
      .mode("lch")
      .colors(numberOfColors);

  let buffer: Point[] = Array(trailLength);
  let color;

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(width, width);
    p5.frameRate(30);
    color = p5.color(primaryColor);
  }

  function draw(p5: p5Types) {
    t += 1;

    p5.clear();
    p5.background("black");
    p5.noFill();
    p5.noStroke();

    buffer.push({
      color: p5.color(Math.random() * 255, Math.random() * 255, Math.random() * 255),
      x1: width * p5.noise(t + 1),
      x2: width * p5.noise(t + 2),
      x3: width * p5.noise(t + 3),
      x4: width * p5.noise(t + 4),
      y1: width * p5.noise(t + 5),
      y2: width * p5.noise(t + 6),
      y3: width * p5.noise(t + 7),
      y4: width * p5.noise(t + 8),
    });

    buffer.forEach((b, i) => {
      b.color.setAlpha(i * 255/trailLength);
      p5.stroke(b.color)
      p5.bezier(b.x1, b.y1, b.x2, b.y2, b.x3, b.y3, b.x4, b.y4)
    });

    if (buffer.length > trailLength) {
      buffer.shift();
    }
  }

//   function draw() {

//   }

  return <Sketch setup={setup} draw={draw} />;
}
