import { Dinosaure } from './dinosaure.js'
import { Obstacle } from './obstacle.js'
import { Score } from './galeta.js'

const obstacles = []
const score = new Score()
var puntuacio = document.getElementById('score')
puntuacio.textContent = 0
var record = document.getElementById('best')
record.textContent = score.getScore()




const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const dino = new Dinosaure()

var colision = false

function floor() {
  // Dibuixa el terra al canvas
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20)
}
function engine() {
  // Buidar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Dibuixar el terra 
  floor();
  // Dibuixar el dinosaure
  dino.draw(ctx)
  if (Math.random() < 0.009) {

    const lastObstacle = obstacles[obstacles.length -1]
    const lastObstacleExists = !lastObstacle
    const espacioRecorridoUltimoObstaculo = canvas.width - lastObstacle.posX
    const distanciaSeguridad = 250
    if (lastObstacleExists || espacioRecorridoUltimoObstaculo >= distanciaSeguridad) {
      obstacles.push(new Obstacle())
    }
  }
  obstacles.forEach((obstacle, index) => {
    //console.log(obstacle.posX, obstacle.amplada, dino.isJumping)
    if (obstacle.posX < -obstacle.amplada) {
      obstacle = null
      obstacles.splice(index, 1)
    } else if (obstacle.posX > 16 && obstacle.posX < 94 && dino.isJumping == false) {
      console.log("Has chocado!")
      colision = true
      ctx.fillText("Joc acabat", 400, 100)
    } else if (colision == false && obstacle.posX == 15){
      obstacle.puntuat = true
      puntuacio.textContent++
      score.setScore(puntuacio.textContent)
      console.log("+ un punto")
      obstacle.draw(ctx)
    } else {
      obstacle.draw(ctx)
    }
  }) 
  record.textContent = score.getScore()
  if (colision == false) {
    requestAnimationFrame(engine)
  }
}
requestAnimationFrame(engine)