export default function createKeyboardListener(document) {
    const state = {
        observers: [],
        playerId: null
    }

    function registerPlayerId(playerId) {
        state.playerId = playerId
    }

    function subscribe(observerFunction) {
        state.observers.push(observerFunction)
    }

    function notifyAll(command) {
        //console.log(`Notifying ${state.observers.length} observers`)

        for (const observerFunction of state.observers) {
            
            observerFunction(command)
           
        }

    }

    document.addEventListener('keydown', handleKeydown)

    function handleKeydown(event) {
        //console.log(event.key)  (vai aparecer a tecla digitada no console)
        const keyPressed = event.key

        const command = {
            type: 'move-player',
            playerId: state.playerId,
            keyPressed
        }

        notifyAll(command)
    }
    
    return {
        subscribe,
        registerPlayerId
    }
}