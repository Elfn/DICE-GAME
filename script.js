
var scores, roundScore, activePlayer, read,gameIsPlaying;

 
init();
//console.log(dice);
//QuerySelector is a document interface's method that return the first item 
//mapping to the selector
//Write
//document.querySelector('#current-'+activePlayer).textContent = dice;
//document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';

//Read
read = document.querySelector('#current-'+activePlayer).textContent;

console.log(read);



//Hide dice in the middle
document.querySelector('.dice').style.display = 'none';

//***** EVENT HANDLER */

// //Function to execute when we use click event
// function btn(){

// }

//Event listener is a function that react to an event
document.querySelector('.btn-roll').addEventListener('click',function(){
 if(gameIsPlaying){
    //Random number
   var  dice = Math.floor(Math.random() * 6 ) + 1;
    
   //Display result
   var diceDOM = document.querySelector('.dice');
   document.querySelector('.dice').style.display = 'block';
   diceDOM.src = 'dice-'+ dice +'.png';

    //Read result into integer
    document.querySelector('#current-'+activePlayer).textContent = dice;
  
   //Update round score if the rolled number is not a 1
  if(dice !== 1)
  {
      roundScore+=dice;
      document.querySelector('#current-'+activePlayer).textContent = roundScore;
  } else{
     //nextPlayer
      nextPlayer();      
    }
 }
});


document.querySelector('.btn-hold').addEventListener('click',function(){
   
   if(gameIsPlaying)
   {
    //Add current score to global score
    scores[activePlayer] += roundScore;
    
    //Update the UI
    document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

    //Check if player won
    if(check(scores[activePlayer]))
    {
        document.querySelector('#name-'+activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.btn-roll').disabled = true;
        document.querySelector('.btn-hold').disabled = true;
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
        document.querySelector('.player-'+activePlayer+'-panel').classList.add('active');
        gameIsPlaying = false;

    }
    else{
        //nextPlayer
         nextPlayer();      
       }
    //NEXT player
    nextPlayer();
   }
});

document.querySelector('.btn-new').addEventListener('click',init);

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Change player background
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //Hide the dice
    document.querySelector('.dice').style.display = 'none';
}

function check(score)
{
    return score >= 10 ? true : false;
}

function init()
{

 scores = [0,0];
 roundScore = 0;
 activePlayer = 0;
 gameIsPlaying = true
 
 document.querySelector('.dice').style.display = 'none';

 document.getElementById('score-0').textContent = '0';
 document.getElementById('score-1').textContent = '0';
 document.getElementById('current-0').textContent = '0';
 document.getElementById('current-1').textContent = '0';

 document.querySelector('.btn-roll').disabled = false;
 document.querySelector('.btn-hold').disabled = false;

 document.querySelector('.player-0-panel').classList.remove('active');
 document.querySelector('.player-1-panel').classList.remove('active');
 document.querySelector('.player-0-panel').classList.remove('winner');
 document.querySelector('.player-1-panel').classList.remove('winner');
 document.querySelector('.player-0-panel').classList.add('active');

 document.getElementById('name-0').textContent = 'Player 1';
 document.querySelector('#name-1').textContent = 'Player 2';


}