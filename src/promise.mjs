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
.then((player)=>{
    console.log(`${player} won a prize in the draw!`)
    return luckyDraw('Caroline')
})
.then((player)=>{
    console.log(`${player} won a prize in the draw!`)
    return luckyDraw('Sabrina')
})
.then((player)=>{
    console.log(`${player} won a prize in the draw!`)
})
.catch((err)=>{
    console.log('E stato provocato un errore', err)
})