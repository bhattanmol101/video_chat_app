navigator.getUserMedia({
    video: true,
    audio: true
}, (stream) => {

    var Peer = require('simple-peer')

    var peer = new Peer({
        initiator : location.hash === '#init',
        trickle : false,
        stream: stream
    })

    peer.on('signal', (data)=>{
        document.getElementById('yourId').value = JSON.stringify(data)
    })

    document.getElementById('connect').addEventListener('click', ()=>{
        var otherId = JSON.parse(document.getElementById('otherId').value)
        peer.signal(otherId)
    })

    document.getElementById('send').addEventListener('click', ()=>{
        var yourMessage = document.getElementById('yourMessage').value
        peer.send(yourMessage)
    })

    peer.on('data', (data) => {
        document.getElementById('message').textContent += data + '\n'
    })

    peer.on('stream', (stream) => {
        var video = document.createElement('video')
        document.body.appendChild(video)

        video.srcObject = stream
        video.play()
    })

}, (err) => {
    console.log(err)
})