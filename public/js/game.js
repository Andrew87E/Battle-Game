// local storage variables
const gameData = localStorage.getItem("gameData");
const gameID = JSON.parse(gameData).game_id;
const player = JSON.parse(gameData).player;

// action button variables
var attackBtn = document.querySelector('#attack')
var heavyBtn = document.querySelector('#heavy-attack')
var healBtn = document.querySelector('#heal')
//message variables
var actionPrompt = document.querySelector('#action-prompt');
var oppTurn = document.querySelector('#oppTurn')

//functions to call actions
const attackHandler = function () {
    action("attack",player,gameID)
    notTurn()
};

const heavyAttackHandler = function () {
    console.log('You did a special attack!')
    notTurn()
}

const healHandler = function () {
    action("heal",player,gameID)
    notTurn()
}

//event listeners for actions
// document
// .querySelector('#attack')
// .addEventListener('click', attackHandler)

// document
// .querySelector('#heavy-attack')
// .addEventListener('click', heavyAttackHandler)

// document
// .querySelector('#heal')
// .addEventListener('click', healHandler)

// function for doing the selected action(affects database)
function action(action,playerNum,id) {
    const playerActions = {action: action, player: playerNum, gameID: id}
    console.log(playerActions)
    fetch(`/api/game/action/`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(playerActions),
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }


    //function to check game status from data base   
  function gameStatus() {
    fetch(`/api/game/${gameID}`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        if(data.winner){
            document.location.assign('/gameOver')
        }
        if(player == 1 && data.player1turn || player == 2 && !data.player1turn){
            isTurn()
        }
        else{
            notTurn()
        }
    })
    .catch(error => console.log(error))
    
} 
//checking the game status when the page loads
gameStatus()
//checking status every 2 minutes
const statusPing = setInterval(gameStatus,2000)
//hiding buttons when its not your turn
function notTurn(){
    actionPrompt.setAttribute ('style', 'display:none')
    attackBtn.setAttribute ('style', 'display:none')
    heavyBtn.setAttribute ('style', 'display:none')
    healBtn.setAttribute ('style', 'display:none')
    oppTurn.setAttribute ('style', 'display:block')
}
//showing the buttons when it is you turn
function isTurn(){
        actionPrompt.setAttribute ('style', 'display:block')
        attackBtn.setAttribute ('style', 'display:inline')
        heavyBtn.setAttribute ('style', 'display:inline')
        healBtn.setAttribute ('style', 'display:inline')
        oppTurn.setAttribute ('style', 'display:none')
}



//code for adjusting health bar

function changeHealth(newHealth){
    let healthBar = document.querySelector('.your-health')
    let total = healthBar.dataset.total
    let health = healthBar.dataset.value

    let damage = health - newHealth
    let damagePercent = damage/total

    let barLength = (newHealth/total) * 100
    document.querySelector('.your-bar').style.width = barLength + '%'

    healthBar.dataset.value= newHealth
}


setTimeout(function(){
    changeHealth(24)
    console.log("health")
  }, 1000); 
  setTimeout(function(){
    changeHealth(17)
    console.log("health")
  }, 2000); 
  setTimeout(function(){
    changeHealth(9)
    console.log("health")
  }, 3000); 
  setTimeout(function(){
    changeHealth(0)
    console.log("health")
  }, 4000); 