import Sketch from "react-p5";
import p5Types from "p5";
import chroma from "chroma-js";
import { getCurves } from "crypto";


type Point = {
  x: number;
  y: number;
};

type Curve = {
  points: Point[];
  rotation: number;
  stroke: number;
}


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

  const primaryColor = '#30B0F0';
  const width = 800;
  const curves: Curve[] = [];
  const freq = 64;

  // build sine curves with offset
  for (let c=0; c<10; c++) {
    const points = []
    const rotation = c/600;
    const stroke = c/2;

    for (let i=0; i < 800; i+=1) {
      points.push({
        x: i,
        y: width/2 + 20 * Math.sin(t + i * Math.PI / freq),
      });
    }
    curves.push({ points, rotation, stroke });
  }


  let color;

  function setup(p5: p5Types, canvasParentRef: Element) {
    p5.createCanvas(width, width);

    p5.frameRate(30);
    // color = p5.color(primaryColor);
  // }

  // function draw(p5: p5Types) {
    // t += 1;

    // p5.clear();
    p5.background("#fff5de");

    const padding = 50;
    p5.fill('#ffd778');
    p5.stroke('#6799f0');
    p5.strokeWeight(0);
    p5.rect(padding, padding, width - padding*2, width - padding*2, 10);

    p5.noFill();
    p5.stroke('#6799f0');


    // render curves
    curves.forEach(curve => {
      p5.beginShape();
      p5.rotate(curve.rotation);
      p5.strokeWeight(curve.stroke);
      curve.points.forEach(({x, y}) => {
        p5.curveVertex(x, y);
      })
      p5.endShape();
    })

    function granulate(amount: number) {
      p5.loadPixels();
      const d = p5.pixelDensity();
      const pixelsCount = 4 * (width * d) * (width * d);
      for (let i = 0; i < pixelsCount; i += 4) {
          const grainAmount = p5.random(-amount, amount);
          p5.pixels[i] = p5.pixels[i] + grainAmount;
          p5.pixels[i+1] = p5.pixels[i+1] + grainAmount;
          p5.pixels[i+2] = p5.pixels[i+2] + grainAmount;
          // comment in, if you want to granulate the alpha value
          // pixels[i+3] = pixels[i+3] + grainAmount;
      }
      p5.updatePixels();
    }

    granulate(10);



  }

  function draw() {

  }

  return <Sketch setup={setup} draw={draw} />;
}
