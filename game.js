//Imports
import { Dinosaure } from './dinosaure.js'
import { Obstacle } from './obstacle.js'
import { Score } from './galeta.js'

//Array de las instancias de los obstaculos
const obstacles = []

//Puntuacion y record (galeta.js)
const score = new Score() //Nueva instancia de la clase Score
var puntuacio = document.getElementById('score') 
puntuacio.textContent = 0
var record = document.getElementById('best')
record.textContent = score.getScore()

//Define el canvas y variable de sus dimensiones
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const alturaLienzo = canvas.height
const anchuraLienzo = canvas.width

//Instancia nueva de la clase dinosaurio
const dino = new Dinosaure()

//Flags
var colision = false

//Dibuja el suelo
function floor() {
  // Dibuixa el terra al canvas
  ctx.fillStyle = '#8B4513';
  ctx.fillRect(0, canvas.height - 20, canvas.width, 20)
}

//Funcion encargada de la logica de aparecer y desaparecer obstaculos
function obstaclesSpawnAndDespawn (){
  //variables
  const lastObstacle = obstacles[obstacles.length - 1] //Representa el ultimo item del array (si no hay = undefined)
  const lastObstacleExists = Boolean(lastObstacle) //Comprueba si hay algun item en el array 
  const distanciaSeguridad = 250

  //generacion de obstaculos
  if (Math.random() < 0.009) {
    if (!lastObstacleExists) {
      obstacles.push(new Obstacle()) //Si no existe un obstaculo, se crea uno
    } else {
      const espacioRecorridoUltimoObstaculo = anchuraLienzo - lastObstacle.posX 
      if (espacioRecorridoUltimoObstaculo >= distanciaSeguridad) {
        obstacles.push(new Obstacle()) //Si, si existe uno y se cumple la distancia, se crea uno
        //si no, nada.
      }
    }
  }

  //Despawn de obstaculos
  obstacles.forEach(function(obstacle, index) { //Foreach para recorrer el array de obstaculos y eliminar los que se salen del canvas
    if (obstacle.posX < -obstacle.amplada) {
      obstacle = null
      obstacles.splice(index, 1)
    }
  })
}

function engine() {
  // Buidar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  // Dibuixar el terra 
  floor();
  // Dibuixar el dinosaure
  dino.draw(ctx)
  //Generacion de obstaculos
  obstaclesSpawnAndDespawn()
  //console.log(obstacles)

  obstacles.forEach((obstacle, index) => {
    //console.log(obstacle.posX, obstacle.amplada, dino.isJumping)
    if (obstacle.posX > 16 && obstacle.posX < 94 && dino.isJumping == false) {
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