const players = ['Magnus', 'Eline', 'Ding', 'Judith', 'Praggna'];
const scores = [ ];
const NUM_DICE = 3;
console.log(`
DOBBELSTENEN
============
aantal deelnemers: ${players.length}
`);
for (let i = 0; i < players.length; i++) {
    const dice = new Array(NUM_DICE).fill(0).map(() => Math.floor(Math.random() * 6) + 1);
    scores[i] = getTotal(dice);
    console.log(`${players[i]} gooit ${scores[i]} punten`);
    console.log(diceToString(dice));
}
console.log(`\n WINNAAR: `);
console.log(`%c${getWinner(scores, players)}`, 'color: black; background-color: yellow;');
function diceToString(dice) {
    let retval = "";
    for (let d of dice) {
        switch (d) {
            case 1:
                retval += '⚀ ';
                break;
            case 2:
                retval += '⚁ ';
                break;
            case 3:
                retval += '⚂ ';
                break;
            case 4:
                retval += '⚃ ';
                break;
            case 5:
                retval += '⚄ ';
                break;
            case 6:
                retval += '⚅ ';
                break;
            default:
                break;
        }
    }
    return retval;
}
function getTotal(dice) {
    return dice.reduce((acc, curr) => acc + curr, 0);
}
function getWinner(totals, names) {
    let winnerIndex = 0;
    let draw = false;
    for (let i = 1; i < totals.length; i++) {
        if (totals[i] === totals[winnerIndex]) draw = true;
        else if (totals[i] > totals[winnerIndex]) {
            winnerIndex = i;
            draw = false;
        }
    }
    return draw ? "geen winnaar" : names[winnerIndex];
}