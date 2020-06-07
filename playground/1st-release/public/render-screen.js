export default function renderScreen(screen, game, requestAnimationFrame, currentPlayerId ) {
    const context = screen.getContext('2d')
    context.fillStyle = 'white'
    context.clearRect(0, 0, 15, 15)

    for (const playerId in game.state.players) {
        const player = game.state.players[playerId]
        context.fillStyle = 'rgba(223, 6, 6)'
        context.fillRect(player.x, player.y, 1, 1)
    }
    for (const fruitId in game.state.fruits) {
        const fruit = game.state.fruits[fruitId]
        context.fillStyle = 'rgb(80, 10, 150)'
        context.fillRect(fruit.x, fruit.y, 1, 1)
    }
    
    const currentPlayer =  game.state.players[currentPlayerId]

    if(currentPlayer) {
        context.fillStyle = 'rgba(6, 223, 53)'
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1)
    }
 
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerId)
    })
}
    /*const color = 'red'
const positionX = 0
const positionY = 0
const width = 250
const height = 250

context.fillStyle = color
context.fillRect(positionX, positionY, width, height)*/
