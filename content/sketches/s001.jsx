const MIN_RAD = 150;
const MAX_RAD = 250;
const ITEM_COLOR = 'red';
const BG = 'rgba(50,50,50,.0)';
const VELOCITY = 1;

export default function sketch (p) {
    let bg = p.color(BG);
    let itemColor = p.color(ITEM_COLOR);
    let rad = MIN_RAD;
    let grow = true;
    let frame = 0;
  
    const render = () => {
      let x = p.windowWidth / 2;
      let y = p.windowHeight / 2;

      p.background(bg);
      p.fill(itemColor);
      p.stroke(itemColor);
      p.ellipse(x, y, rad, rad);
    }

    const increment = () => {
      rad = grow ? rad + VELOCITY : rad - VELOCITY;
      if (rad > MAX_RAD) {
          grow = false;
      };
      if (rad < MIN_RAD) {
          grow = true;
      }
      frame++;
    }

    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight);
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
    p.draw = () => {
      increment();
      render();
    }

  }
  