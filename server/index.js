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
//             } ,
//             { _id : fsdfkkl --> id of player  ,
//               timing : 18362 --> timing of player 
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

    socket.join(data._id)
    data.admin = true
    socket.coustomeId = data._id
    socket.roomName = data._id

    const value = { members: [data], pokemonData: [pokemonData] }
    Rooms.set(data._id, value)
    callback({ members: Rooms.get(socket.roomName).members, pokemonData: Rooms.get(socket.roomName).pokemonData })

    const all = io.sockets.adapter.rooms

    console.log("room ", Rooms.get(socket.roomName))

  })

  socket.on("joinRoom", ({ data, roomName, pokemonData }, callback) => {
 
    // const exist = Rooms.findIndex(item => item.roomName == roomName)


    if (Rooms.has(roomName)) {
      data.admin = false
      socket.coustomeId = data._id
      socket.roomName = roomName
      socket.join(roomName)

      Rooms.get(roomName).members.push(data)
      Rooms.get(roomName).pokemonData.push(pokemonData)
      callback({ members: Rooms.get(roomName).members, pokemonData: Rooms.get(roomName).pokemonData })
      socket.to(socket.roomName).emit("changeArray", { updated_Members: Rooms.get(roomName).members, updated_pokemonData: Rooms.get(roomName).pokemonData })
    }

    callback({ members: false, pokemonData: [] })
    const all = io.sockets.adapter.rooms
   
   
    console.log("room ", Rooms.get(socket.roomName))


  })

  socket.on("giveId" , ({},callback)=>{
    callback({_id : socket.coustomeId})
  })

  socket.on("doneSelection", ({ selectedPokemons }) => {
    console.log("done selection call ")
    socket.to(socket.roomName).emit("TRdoneSelection", { id: socket.id, selectedPokemons })
  })
  socket.on("showSelect" ,()=>{
    io.to(socket.roomName).emit("TRshowSelect" , {})
  })
  socket.on("startGame", ({ }) => {
    
    io.to(socket.roomName).emit("TRstartGame", {})
  })

  socket.on("isWinner", ({answerTimining}) => {
    console.log(" iswinner callled ")
    console.log(socket.coustomeId)
    if (!Timings.has(socket.roomName)) {
      console.log("inside if ")
      const obj = { _id: socket.coustomeId, timing: answerTimining }
      Timings.set(socket.roomName, [obj])
      setTimeout(() => {
      
        let id = null
        let currentTiming = Infinity
        for (let index = 0; index < Timings.get(socket.roomName).length; index++) {
          const e = Timings.get(socket.roomName)[index];
          if (e.timing <= currentTiming) {
            currentTiming = e.timing
            id = e._id
          }
        }
        Timings.delete(socket.roomName)
        console.log("emiting to other users ")
        io.to(socket.roomName).emit("TRisWinner", { id: id })
      }, 2000);
    }
    console.log("outside of if")
    const obj = { _id: socket.coustomeId, timing: answerTimining }
    const array = Timings.get(socket.roomName )
    array.push(obj)
    Timings.set(socket.roomName, array)
    console.log(Timings.get(socket.roomName))
    

  })


  socket.on('disconnect', () => {
    console.log("disconnected ")
    // const exist = Rooms.findIndex(item => item.roomName == socket.roomName)

    if (Rooms.has(socket.roomName)) {
      const player = Rooms.get(socket.roomName).members.findIndex(item => item._id == socket.coustomeId)
      console.log("adimi or not", Rooms.get(socket.roomName).members[player].admin)
      if (Rooms.get(socket.roomName).members[player].admin) {


        Rooms.delete(socket.roomName)

        io.to(socket.roomName).emit("roomDeleted", {})
      }

      else {
        Rooms.get(socket.roomName).members.splice(player, 1)
        Rooms.get(socket.roomName).pokemonData.splice(player, 1)

        io.to(socket.roomName).emit("changeArray", { updated_Members: Rooms.get(socket.roomName).members, updated_pokemonData: Rooms.get(socket.roomName).pokemonData })

      }
    }
    console.log("this player get out of room", socket.coustomeId)
    // console.log("now room is like ", Rooms)




    socket.leaveAll();

    const all = io.sockets.adapter.rooms

    console.log("group accrding to socket ", all)



  })

})

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})