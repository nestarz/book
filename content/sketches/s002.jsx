
export default function sketch (p) {
    const star = () => {
      const x = p.random(-p.windowWidth/2, p.windowWidth/2)
      const y = p.random(-p.windowHeight/2, p.windowHeight/2)
      const z = p.random(1000)
      return { x, y, z }
    }
  
    const stars = new Array(128)
  
    p.setup = () => {
      p.createCanvas(p.windowWidth, p.windowHeight / 4);
      for (let i = 0; i < stars.length; i++) {
        stars[i] = star()
      }
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight /4);
    }
  
    const update = (coord) => {
      const { z } = coord
      let newZ = z - 1
      if (newZ < 1) {
        newZ = p.random(5000)
      }
      return { ...coord, z: newZ }
    }
  
    const show = (coord) => {
      const { x, y, z } = coord
      p.fill(255)
      p.noStroke()
  
      const sx = p.map(x / z, 0, 1, 0, p.windowWidth)
      const sy = p.map(y / z, 0, 1, 0, p.windowHeight)
  
      const r = p.map(z, 0, 1000, 4, 0)
      p.ellipse(sx, sy, r*1, r*2000)
    }
  
    p.draw = () => {
      p.background("#f4f4f4")
      p.translate(p.windowWidth/2, p.windowHeight/2)
      for (let i = 0; i < stars.length; i++) {
        stars[i] = update(stars[i])
        show(stars[i])
      }
    }
  }
  