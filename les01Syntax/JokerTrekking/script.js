console.log('%c// trekking ', 'color: purple; font-size: 20px');
console.log('%cgetrokken getal: ' + (rndGetal = Next(1000, 9999)), 'color: yellow');
function Next(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const spelers = [];
for (let i = 0; i < 10000; i++) {
    spelers[i] = Next(1000, 9999);
}
console.log('');
console.log('%c// gokken ', 'color: purple; font-size: 24px');
console.log(`aantal iteraties: ${spelers.length}`);
console.log('');
console.log('%c// resutaten ', 'color: purple; font-size: 24px');
const nulJuist = [];
const eenJuist = [];
const tweeJuist = [];
const drieJuist = [];
const allesJuist = [];
raad(spelers, nulJuist, eenJuist, tweeJuist, drieJuist, allesJuist,);
console.log(`0 juist: ${nulJuist.length} `);
console.log(`1 juist: ${eenJuist.length} `);
console.log(`2 juist: ${tweeJuist.length} `);
console.log(`3 juist: ${drieJuist.length} `);
console.log(`4 juist: ${allesJuist.length}`);
function raad(players, nulJuist, eenJuist, tweeJuist, drieJuist, allesJuist) {
    for (let i = 0; i < 10000; i++) {
        if (players[i] == rndGetal) {
            allesJuist.push(players[i]);
        }
        else if (players[i] % 1000 == rndGetal % 1000) {
            drieJuist.push(players[i]);
        }
        else if (players[i] % 100 == rndGetal % 100) {
            tweeJuist.push(players[i]);
        }
        else if (players[i] % 10 == rndGetal % 10) {
            eenJuist.push(players[i]);
        }
        else {
            nulJuist.push(players[i]);
        }
    }
}
console.log('%c gemiddelde winst: ', 'color: green ; font-size: 16px ; background-color: gray');
