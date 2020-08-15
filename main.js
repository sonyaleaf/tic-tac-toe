/*----- constants -----*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*----- app's state (variables) -----*/
let board;
let turn;
let win;
/*----- cached element references -----*/
const squares = Array.from(document.querySelectorAll('#board div'));
const messages = document.querySelector('h2');
/*----- event listeners -----*/
document.getElementById('board').addEventListener('click', handleTurn);
document.getElementById('reset-button').addEventListener('click', init);
/*----- functions -----*/
function init() {
    /* clear win and set turn to 'X' on reset */
    win = null;
    turn = 'X';

    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];

    render();
};
init();

function render() {
    board.forEach(function(mark, index){
        /* this sets the text content of the square of the same position to the mark on the board. */
        squares[index].textContent = mark;
    });
    win = getWinner();
    /* if win is 'T' then 'It's a tie!', if the game has been won, display winner, else, display who's turn it is. */
    messages.textContent = win === 'T' ? `It's a tie!` : win ? `${win} wins the game!` : `It's ${turn}'s turn!`;
}

function handleTurn(event) {
    let idx = squares.findIndex(function(square) {
        return square === event.target;
    });
    /* allow user to place mark only in blank squares */
    if(board[idx] == '')
    {
        board[idx] = turn;
        /* if it is X's turn, assign turn to 'O', else assign turn to 'X' */
        turn = turn === 'X' ? 'O' : 'X';
    }
    if(win == null) {
        render();
    }
};

function getWinner() {
    let winner = null;
    winningCombos.forEach(function(combo, index) {
        /* iterate through each winning combo, check that there is a mark on the board at the first index in the combo, 
         check that all other indices in the combo have the same mark, if all true- set winner to mark at first index of the combo */
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) winner = board[combo[0]];
    });
    /* return winner if there is a winner, if there are unused spaces on the board return null,
     if there is no winner and no empty spaces return 'T' for tie */
    return winner ? winner : board.includes('') ? null : 'T';
}