export const strip = (value) => {
  value = value.replace(/(<([^>]+)>)/ig,"")
  value = value.replace('&#39;', "'")
  value = value.replace('&nbsp;', ' ')
  return value
}

export class Carriage {
  constructor(y=0){
    this.y = y
  }
  increment = (value) => {
    this.y = this.y + value
  }
  moveTo = (value) => {
    this.y = value
  }
}

export class Canvas {

  constructor(doc, x0, y0, { x1=null, y1=null, width=null, height=null }){
    this.doc = doc
    this._coordinates = { x0: x0, y0: y0, x1: x1, y1: y1 }
    this._dimensions = { width: width, height: height }
  }

  get width(){
    return this.dimensions.width
  }

  get height(){
    return this.dimensions.height
  }

  get x0(){
    return this.coordinates.x0
  }

  get x1(){
    return this.coordinates.x1
  }

  get y0(){
    return this.coordinates.y0
  }

  get y1(){
    return this.coordinates.y1
  }

  get coordinates(){
    var coordinates = Object.assign({}, this._coordinates)
    if (!coordinates.y1) {
      if (!this._dimensions.height){
        throw new Error('Must specify either height or y1.')
      }
      coordinates.y1 = coordinates.y0 + this._dimensions.height
    }
    if (!coordinates.x1) {
      if (!this._dimensions.width){
        throw new Error('Must specify either width or x1.')
      }
      coordinates.x1 = coordinates.x0 + this._dimensions.width
    }
    return coordinates
  }

  get dimensions(){
    var dimensions = Object.assign({}, this._dimensions)
    if (!dimensions.height) {
      if (!this._coordinates.y1) {
        throw new Error('Must specify either height or y1.')
      }
      dimensions.height = this._coordinates.y1 - this._coordinates.y0
    }
    if (!dimensions.width) {
      if (!this._coordinates.x1) {
        throw new Error('Must specify either width or x1.')
      }
      dimensions.width = this._coordinates.x1 - this._coordinates.x0
    }
    return dimensions
  }

  draw(){
    this.doc.line(this.coordinates.x0, this.coordinates.y0,
      this.coordinates.x1, this.coordinates.y0);
    this.doc.line(this.coordinates.x1, this.coordinates.y0,
      this.coordinates.x1, this.coordinates.y1);
    this.doc.line(this.coordinates.x1, this.coordinates.y1,
      this.coordinates.x0, this.coordinates.y1);
    this.doc.line(this.coordinates.x0, this.coordinates.y1,
      this.coordinates.x0, this.coordinates.y0);
  }
}
