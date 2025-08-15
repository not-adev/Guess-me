export default function (io) {
  const creatroom = io.of('/creatroom');
  

  creatroom.on('connection', (socket) => {

    console.log('User connected to /creatroom');
    socket.on("createRoom",({data , array},callback)=>{
    
      socket.join(data._id)
      array.push(data)
      array[0].admin = true
     
      callback({array : array})
     
    })

    socket.on('notify', (data) => {
      creatroom.emit('notify', data);
    });

    socket.on('disconnect', () => {
      console.log("disconnected ")
    })
  })
}