function rectangularCollision({rect1, rect2}) {
    return (
        rect1.attackBox.position.x + 
        rect1.attackBox.width >= 
        rect2.position.x && 
        rect1.attackBox.position.x <= 
        rect2.position.x + rect2.width &&
        rect1.attackBox.position.y + rect1.attackBox.height >= 
        rect2.position.y &&
        rect1.attackBox.position.y <= 
        rect2.position.y + rect2.height
    )
}


let timer = 60
let timerId
function pickAWinner({player, enemy, timerId}) {
    clearTimeout(timerId)
    displayTextStyle.display = "flex"
    if (player.health === enemy.health ) 
    {
        displayTimer.innerHTML = "Draw"
        displayText.innerHTML = "It's a tie"
    }
    else if (player.health > enemy.health)
    {
        displayText.innerHTML = "Player is the winner"
    }
    else if (enemy.health > player.health)
    {
        displayText.innerHTML = "Enemy is the winner"
    }
}

const displayTextStyle = document.querySelector("#displayText").style
const displayText = document.querySelector("#displayText")
const displayTimer = document.querySelector("#timer")
function decreaseTimer() {
    if (timer > 0) {
        timerId = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector("#timer").innerHTML = timer
    }

    // 1 = set a value
    // 2 == check if a value is equal to another value
    // 3 === check if a value is equal to another value and the type is the same

    if (timer === 0) {
       pickAWinner({player, enemy, timerId})
    }
    
}

decreaseTimer()