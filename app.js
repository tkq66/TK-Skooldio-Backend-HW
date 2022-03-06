// import * as readline from 'node:readline';
// import { stdin as input, stdout as output } from 'node:process';

const readline = require('readline');
const process = require("process");
const constants = require("./constants");

const ask = (query, rl) => new Promise(resolve => rl.question(query, answer => resolve(answer)));

const fischer_shuffle = arr => {
    let shuffled_arr = [...arr];
    for (let curr_id = arr.length - 1; curr_id > 0; curr_id--) {
        let new_id = Math.floor(Math.random() * (curr_id + 1));
        let temp = shuffled_arr[curr_id];
        shuffled_arr[curr_id] = shuffled_arr[new_id];
        shuffled_arr[new_id] = temp;
    }
    return shuffled_arr;
};

const game_shuffle = deck => {
    let shuffled_deck = fischer_shuffle(deck);
    arr_len = shuffled_deck.length
    let player_cards = [shuffled_deck[0], shuffled_deck[1]]; 
    let dealer_cards = [shuffled_deck[arr_len-1], shuffled_deck[arr_len-2]];  
    return new Promise(resolve => resolve(player_cards, dealer_cards));
}

const run = () => {
    const rl = readline.createInterface({
        input: process.stdin, 
        output: process.stdout
    });

    // This will be the main function in which all logic will be decoupled.
    // Each stage in the game run through each promise resolution.
    // So far, I have only managed to create the shuffle logic.
    ask('Please put your bet:\n', rl)
        .then(answer => game_shuffle(constants.cards))
        .then((player_cards, dealer_cards)  => {
            console.log('You got ' + player_cards)
            console.log('The dealer got ' + dealer_cards)
            rl.close();
        });
};

exports.run = run;