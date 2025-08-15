export default function(io) {
  const joinroom = io.of('/joinroom');

  joinroom.on('connection', (socket) => {
    console.log('User connected to /joinroom');

    socket.on('notify', (data) => {
      joinroom.emit('notify', data);
    });
     socket.on('disconnect', () => {
      console.log("disconnected ")
    })
  });
}