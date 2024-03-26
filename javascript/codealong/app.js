// ## Big Score Challenge

// - Create a script that will use a loop to iterate through an array of scores (numbers) and log to the console "12 is a big score!" or "50 is a big score!" for each score that is greater than **10**.

// ### Extension

// - Use a function that takes in two parameters: an array of scores (numbers) and a big score threshold.
// - We should be able to change the score threshold to change what a big score is

const scores = [10,14,30,40,50,60]

for (let i=0; i<=scores.length; i++) {
    if (scores[i] > 10) {
    console.log(`${scores[i]} is a big score `)
    }
}



const scoreThreshold = (scores, threshold) => {
    for (let i = 0; i < scores.length; i++) {
        if (scores[i] > threshold) {
            console.log( `function result: ${scores[i]} is a big score`);
        }
    }
    return 'loop ended'
}

console.log(scoreThreshold(scores, 30));

