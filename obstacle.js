const VELOCITAT = 30 //px/s
const GROUND_Y = 243 // px


import { Dinosaure } from "./dinosaure.js"

export class Obstacle {
    constructor (posX = 770) {
        this.posX = posX
        this.posY = GROUND_Y
        this.velocity = VELOCITAT
        this.altura = 40
        this.amplada = 35
        this.puntuat = false
    }

    draw (ctx) {
        this.posX += -5
        ctx.fillRect(this.posX, this.posY, this.amplada, this.altura)
        
    }
}