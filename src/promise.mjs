export function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));
        (process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        }));
    });
}
let lucky = luckyDraw('Joe')
lucky
.then((player1)=>{
    console.log(`${player1}`)
    return luckyDraw('Caroline')
})
.then((player2)=>{
    console.log(`${player2}`)
    return luckyDraw('Sabrina')
})
.then((player3)=>{
    console.log(`${player3}`)
})
.catch((err)=>{
    console.log('E stato provocato un errore', err)
})