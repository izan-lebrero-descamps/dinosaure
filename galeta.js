export class Score {
    
    getScore() {
        const m = document.cookie.match(/(?:^|; )maxScore=(\d+)/); //Busca en las cookies el valor de maxScore y lo devuelve como un número.
        return m ? Number(m[1]) : 0; //Si no existe, devuelve 0.
    }

    setScore(score) { 
        const currentScore = this.getScore() 
        if (score > currentScore) {
            document.cookie = `maxScore=${score}; max-age=946080000; path=/`   
        }
    }
}