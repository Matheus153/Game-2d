import express from 'express'
import http from 'http'
import createGame from './public/game.js'
import socketio from 'socket.io'

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.start()

/*game.addPlayer({playerId: 'player1', playerX: 1, playerY: 1})

game.addFruit({fruitId: 'fruit2', fruitX: 8, fruitY: 2})
game.addPlayer({playerId: 'player2', playerX: 7, playerY: 8})
game.addPlayer({playerId: 'player3', playerX: 3, playerY: 7})
game.addFruit({fruitId: 'fruit1', fruitX: 5, fruitY: 5})
game.addFruit({fruitId: 'fruit1', fruitX: 5, fruitY: 3})
game.movePlayer({ playerId: 'player1', keyPressed: 'ArrowRight'})*/


game.subscribe((command) => {
    console.log(`> Emitting ${command.type}`)
    sockets.emit(command.type, command)
})


sockets.on('connection', (socket) => {
    const playerId = socket.id
    console.log(`> Player connected on Server with id: ${playerId}`)

    game.addPlayer({ playerId: playerId })

    socket.emit('setup', game.state)

    socket.on('disconnect', () => {
        game.removePlayer({ playerId: playerId})
        console.log(`> Player diconnected: ${playerId}`)
    })

    socket.on('move-player', (command) => {
        command.playerId = playerId
        command.type = 'move-player'

        game.movePlayer(command)
    })

})

server.listen(3000, () => {
    console.log('> Server listening on port: 3000')
})