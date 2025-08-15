import { Pokemon } from "@/datamodel/pokemon_model";
import connect_to_db from "@/db-connection/db-connection";
await connect_to_db()
export default async function save_pokemon({ img, type, name, region, discription, coustome_id }) {
    try {
        console.log('function for saving pokemon is hit ')
        const Newpokemon = new Pokemon({
            img: img,
            type: type,
            name: name,
            region: region,
            discrioption: discription,
            coustome_id: coustome_id
        })
        const saved_poke = await Newpokemon.save()

        console.log(saved_poke)
        console.log(' function for saving pokemon is complete')
        return 'saved '
    } catch (error) {

        return 'not saved '
    }
}