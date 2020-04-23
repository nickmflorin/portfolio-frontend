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
