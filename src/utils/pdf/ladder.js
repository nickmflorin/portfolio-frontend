import { Lines, CircleRadius } from './constants'
import { Doc } from './base'


export class Rung extends Doc {
  constructor(config, {x1 = 0, y0 = 0}){
    super(config)
    this.x1 = x1
    this.y0 = y0
    this.pageNumber = this.page
  }
  draw({ x0 = 0 }){
    this.doc.setPage(this.pageNumber)
    this.setLine(Lines.rung)
    this.doc.line(x0 + CircleRadius, this.y0, this.x1, this.y0)
    this.doc.circle(x0, this.y0, CircleRadius)
  }
}

export class Ladder extends Doc {
  constructor(config, {x0 = 0, y0 = 0}){
    super(config)
    this.x0 = x0
    this.y0 = y0;
    this.rungs = [];
  }
  addRung(rung){
    this.rungs.push(rung)
  }
  draw(){
    // TODO: Don't include the circle radius for the first segment top.
    // TODO: What to do if ladder[i] and ladder[i+1] are on different pages?
    if (this.rungs.length === 0) {
      throw new Error('Cannot draw ladder without any rungs.')
    }

    this.setLine(Lines.ladder)
    this.doc.setPage(this.rungs[0].pageNumber)
    this.doc.line(this.x0, this.y0, this.x0, this.rungs[0].y0 - CircleRadius)

    for (var i = 0; i < this.rungs.length; i++ ){
      this.rungs[i].draw({ x0: this.x0 })

      // Draw Connecting Line
      if (i !== this.rungs.length - 1) {
        this.setLine(Lines.ladder)
        this.doc.setPage(this.rungs[i].pageNumber)
        if (this.rungs[i].pageNumber !== this.rungs[i + 1].pageNumber) {
          // Temporary Guess of 560
          this.doc.line(this.x0, this.rungs[i].y0 + CircleRadius, this.x0, 560 - CircleRadius)
          // Have to Also Draw Continuation of Line on Next Page
        }
        else {
          this.doc.line(this.x0, this.rungs[i].y0 + CircleRadius, this.x0, this.rungs[i + 1].y0 - CircleRadius)
        }
      }
    }
  }
}
