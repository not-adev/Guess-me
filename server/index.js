import express from 'express'
import { Server } from 'socket.io'
import cors from 'cors';
import { createServer } from "http"
import createroom from './namespaces/createroom.js';
import joinroom from './namespaces/joinroom.js';
import play from './namespaces/play.js';

const app = express()
const server = createServer(app)
let Rooms = new Map()
let Timings = new Map()

// strucure of Timings 

// key --> roomName 
// value --> [ { _id : fsdfkkl --> id of player  ,
//               timing : 18362 --> timing of player 
//                 answer : true/false --> answer right or wrong
//             } ,
//             { _id : fsdfkkl --> id of player  ,
//               timing : 18362 --> timing of player 
//                answer : true/false --> answer right or wrong
//             } 
//           ]


// Room Structure
//  key-->roomName 
// value --> { memberes: [{id: "odufdhsfk",userName: "Arif", ...},{},{}]
//     pokemonData: [{ image and other info of each pokemo }, {},{}] }



app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.static('public'));
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
    credentials: true
  }
})


const port = 4000

app.get('/', (req, res) => {
  res.send('Hello Worl!')
})




// createroom(io)
// joinroom(io)
// play(io)


io.on("connection", (socket) => {

  console.log('new user connected')

  socket.on("createRoom", ({ data, pokemonData }, callback) => {
    if (socket.roomName !== undefined) {
      console.log("allready in room creatRoom  ")
      return ReturnToRoomInterface(socket, data, pokemonData)
    }
    socket.join(data._id)
    data.admin = true
    socket.admin = true
    socket.coustomeId = data._id
    socket.roomName = data._id
    const value = { members: [data], pokemonData: [pokemonData] }
    Rooms.set(data._id, value)
    // callback({ members: Rooms.get(socket.roomName).members, pokemonData: Rooms.get(socket.roomName).pokemonData })
    io.to(socket.roomName).emit("changeArray",{ updated_Members: Rooms.get(socket.roomName).members, updated_pokemonData: Rooms.get(socket.roomName).pokemonData })
    const all = io.sockets.adapter.rooms
    console.log("room ", Rooms.get(socket.roomName))
  })

  socket.on("joinRoom", ({ data, roomName, pokemonData }, callback) => {
   

    if (socket.roomName !== undefined) {
      console.log("already in join room ")
      return ReturnToRoomInterface(socket, data, pokemonData)
    }

    if (Rooms.has(roomName)) {
      socket.admin = false
      socket.coustomeId = data._id
      socket.roomName = roomName
      data.admin = false
      socket.join(roomName)
      Rooms.get(roomName).members.push(data)
      Rooms.get(roomName).pokemonData.push(pokemonData)
      callback({ res: true })

      io.to(socket.roomName).emit("changeArray", { updated_Members: Rooms.get(roomName).members, updated_pokemonData: Rooms.get(roomName).pokemonData })

      const all = io.sockets.adapter.rooms
      console.log("room ", Rooms.get(socket.roomName))
      console.log(all)
      return true
    }

    callback({ res: false })
    const all = io.sockets.adapter.rooms
    console.log("room ", Rooms.get(socket.roomName))
    console.log(all)


  })

  socket.on("giveId", ({ }, callback) => {
    callback({ _id: socket.coustomeId })
  })

  socket.on("isAdmin", ({ }, callback) => {
    callback({ admin: socket.admin })
  })


  socket.on("doneSelection", ({ selectedPokemons }) => {
  
    socket.to(socket.roomName).emit("TRdoneSelection", { id: socket.coustomeId, selectedPokemons })
  })

  socket.on("showSelect", () => {
    Rooms.delete(socket.roomName)
    io.to(socket.roomName).emit("TRshowSelect", {})
  })

  socket.on("startGame", (data) => {

    io.to(socket.roomName).emit("TRstartGame", { data })
  })

  socket.on("isWinner", ({ answer, answerTimining }) => {
 

    if (!Timings.has(socket.roomName)) {
      console.log("inside if ")
      const obj = [{ _id: socket.coustomeId, timing: answerTimining, answer: answer }]
      Timings.set(socket.roomName, obj)
      setTimeout(() => {

        let id = null
        let currentTiming = Infinity
        for (let index = 0; index < Timings.get(socket.roomName).length; index++) {
          const e = Timings.get(socket.roomName)[index];
          if (e.answer) {
            if (e.timing <= currentTiming) {
              currentTiming = e.timing
              id = e._id
            }
          }
        }
        Timings.delete(socket.roomName)
        console.log("emiting to other users ")
        io.to(socket.roomName).emit("TRisWinner", { id: id })
      }, 5000);
    }
    else {

     
      const obj = { _id: socket.coustomeId, timing: answerTimining, answer: answer }
      const array = Timings.get(socket.roomName)
      array.push(obj)
      Timings.set(socket.roomName, array)
      console.log(Timings.get(socket.roomName))
    }


  })

  function cleanObject(socket) {
    delete socket.roomName
    delete socket.coustomeId
    delete socket.admin
  }
  function ReturnToRoomInterface(socket, data, pokemonData) {

    data.admin = socket.admin
    if (Rooms.has(socket.roomName)) {
      Rooms.get(socket.roomName).members.push(data)
      Rooms.get(socket.roomName).pokemonData.push(pokemonData)

    }
    else {
      const value = { members: [data], pokemonData: [pokemonData] }
      Rooms.set(socket.roomName, value)
    }
  
    
    io.to(socket.roomName).emit("changeArray", { updated_Members: Rooms.get(socket.roomName).members, updated_pokemonData: Rooms.get(socket.roomName).pokemonData })


  }

  socket.on("TRroomDeleted", () => {
    console.log("tr of delete")
    socket.leave(socket.roomName)
    const all = io.sockets.adapter.rooms
    console.log(all)
    cleanObject(socket)
  })



  socket.on('disconnect', () => {
    console.log("disconnected ")
    if (!socket.roomName) {
      return
    }

    if (Rooms.has(socket.roomName)) {
      if (socket.admin) {
        console.log("admin")
        Rooms.delete(socket.roomName)
        console.log(Rooms.get(socket.roomName))
        io.to(socket.roomName).emit("roomDeleted", {})
        cleanObject(socket)
      }

      else {
        const player = Rooms.get(socket.roomName).members.findIndex(item => item._id == socket.coustomeId)
        console.log(player)
        if(player < 0){
          return
        }
        Rooms.get(socket.roomName).members.splice(player, 1)
        Rooms.get(socket.roomName).pokemonData.splice(player, 1)
        io.to(socket.roomName).emit("changeArray", { updated_Members: Rooms.get(socket.roomName).members, updated_pokemonData: Rooms.get(socket.roomName).pokemonData })
        console.log(Rooms.get(socket.roomName))
        cleanObject(socket)
        console.log(socket.roomName)
      }

    }

    socket.leaveAll();

    const all = io.sockets.adapter.rooms
    console.log("group accrding to socket ", all)



  })

})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})