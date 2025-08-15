import mongoose, { mongo } from "mongoose";



let pokemon_schema = new mongoose.Schema({
    img : {
        type : String ,
        required : true , 
    },
    type :{
        type : String ,
        required : true 
    },
    name : {
        type : String ,
        required : true ,
    },
    region : {
        type : String ,
        required : true 
    },
    
    coustome_id : {
        type : Number ,
        required : true ,
        unique : true 
    }
  
 
})

export const Pokemon = mongoose.models.pokemon || mongoose.model('pokemon',pokemon_schema) ;