import mongoose from "mongoose";
// code structure :- page(0,0) -->pupose(0,0) --> count/serial No. of image (0,0)
/*universal code(purpose ) :- {
                        Navbar :- 00
                        bg:- 11
                        }

page :-{ 
            sinup page :- 01 ,
            login page :- 02 ,
            home page :- 03 ,
            game page :- 04 ,
            user page :- 05 ,
            tutorial page :- 06 , 

          }

purpose :- {
            prompt/pop-up   :- 01 
            map             :- 02
            slider          :- 03
            screen shot     :- 04 


            }

example home--> map --> serial No.
solution --> 030201
    
 
 
*/
let materail_shema = new mongoose.Schema({
    img: {
        type: String
    },
    img_code: {
        type: Number,
    }

})

export const Material = mongoose.models.Material || mongoose.model('Materail',materail_shema)