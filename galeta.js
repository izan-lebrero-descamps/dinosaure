export class Score {
    
    getScore() {
        const m = document.cookie.match(/(?:^|; )maxScore=(\d+)/);
        return m ? Number(m[1]) : 0;
    }

    setScore(score) {
        const currentScore = this.getScore()
        if (score > currentScore) {
            document.cookie = `maxScore=${score}; max-age=946080000; path=/`   
        }
    }
}