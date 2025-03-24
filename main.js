
const score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  lose: 0,
  tie: 0
};

document.querySelector('.js-score').innerHTML = `Wins: ${score.win}. Losses: ${score.lose}. Ties: ${score.tie}`

function resetScore(){

  document.querySelector('.confirm-msg')
    .innerHTML = `Are you sure you want to reset the score(Y/N)? <button class="yes-button">Yes</button> <button class="no-button">No</button>`

  const noButton = document.querySelector('.no-button');
  const yesButton = document.querySelector('.yes-button');

  return () => {
    if(noButton.innerHTML){
      document.querySelector('.no-button').addEventListener('click', ()=>{
        document.querySelector('.confirm-msg').innerHTML = ''
      })
    }
    if(yesButton.innerHTML){
      document.querySelector('.yes-button').addEventListener('click', ()=>{
        document.querySelector('.confirm-msg').innerHTML = ''
        score.win = 0;
        score.lose = 
        score.tie = 0;
        
        localStorage.setItem('score', JSON.stringify(score));
        document.querySelector('.js-score').innerHTML = `Wins: ${score.win}. Losses: ${score.lose}. Ties: ${score.tie}`;
      })
    }
  }
}

let auto = null;
function autoPlay(){
  const playButton = document.querySelector('.auto-play-button');

  if(playButton.innerText === 'Auto Play'){
    playButton.innerHTML = 'Stop Playing';
     
    auto = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 500);

    console.log(auto);

  }
  else{
    playButton.innerHTML = 'Auto Play';
    clearInterval(auto);
    auto = null;
  }
}


const rockButton = document.querySelector('.js-rock-button');
rockButton.addEventListener('click', () => playGame('Rock'));

const paperButton = document.querySelector('.js-paper-button');
paperButton.addEventListener('click', () => playGame('Paper'));

const scissorsButton = document.querySelector('.js-scissors-button');
scissorsButton.addEventListener('click', () => playGame('Scissors'));

document.body.addEventListener('keydown', (event) => {
  if(event.key === 'r'){
    playGame('Rock');
  }
  if(event.key === 'p'){
    playGame('Paper');
  }
  if(event.key === 's'){
    playGame('Scissors');
  }
})

document.querySelector('.auto-play-button').addEventListener('click', ()=>{
  autoPlay();
})

document.body.addEventListener('keydown', (event)=>{
  if(event.key === 'a')
    autoPlay();
})

document.querySelector('.reset-score-button').addEventListener('click', ()=>{
  const confirmReset = resetScore();
  confirmReset();
})

document.body.addEventListener('keydown', (event)=>{
  const confirmReset = resetScore();
  if(event.key === 'Backspace')
    confirmReset();
})

function playGame(playerMove) {
  let computerMove = pickComputerMove();

  let result = '';

  if(playerMove === 'Scissors'){
    if(computerMove === 'Paper'){
      result = 'You Win.';
    }
    else if(computerMove === 'Rock'){
      result = 'You Lose.';
    }
    else if(computerMove === 'Scissors'){
      result = 'Tie.';
    }
  }

  else if(playerMove === 'Paper'){
    if(computerMove === 'Rock'){
      result = 'You Win.';
    }
    else if(computerMove === 'Paper'){
      result = 'Tie.';
    }
    else if(computerMove === 'Scissors'){
      result = 'You Lose.';
    }
  }
  
  else if(playerMove === 'Rock'){
    if(computerMove === 'Scissors'){
      result = 'You Win.';
    }
    else if(computerMove === 'Rock'){
      result = 'Tie.';
    }
    else if(computerMove === 'Paper'){
      result = 'You Lose.';
    }
  }
  
  if(result === 'You Win.'){
    score.win += 1;
  }
  else if(result === 'You Lose.'){
    score.lose += 1;
  }
  else if(result === 'Tie.'){
    score.tie += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `
  You
    <img src="/img/${playerMove}-emoji.png" alt="" class="move-icon">
    <img src="/img/${computerMove}-emoji.png" alt="" class="move-icon">
  Computer`;

  document.querySelector('.js-score').innerHTML = `Wins: ${score.win}. Losses: ${score.lose}. Ties: ${score.tie}`;

//       alert(`Your move: ${playerMove}. Computer move: ${computerMove}. The result: ${result}
// Win: ${score.win}. Lose: ${score.lose}. Tie: ${score.tie}`);
}

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = '';
  
    if(randomNumber >= 0 && randomNumber < 1/3){
      computerMove = 'Rock';
    }
    else if(randomNumber >= 1/3 && randomNumber < 2/3){
      computerMove = 'Paper';
    }
    else if(randomNumber >= 2/3 && randomNumber < 1){
      computerMove = 'Scissors';
    }

    return computerMove;
}
