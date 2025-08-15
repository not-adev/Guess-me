export default function (io) {
  const play = io.of('/play');

  play.on('connection', (socket) => {
    console.log('User connected to /play');

    socket.on('notify', (data) => {
      play.emit('notify', data);
    });

    socket.on('disconnect', () => {
      console.log("disconnected ")
    })
  })
}