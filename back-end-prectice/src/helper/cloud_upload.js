import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function img_uplodad(file, public_id) {
  try {
    console.log(' cloud upload hit ')
    const uploded = await cloudinary.uploader.upload(file, {
      folder: 'pokemons/all-pokemons', resource_type: 'auto' , public_id: public_id

    })
    const url = uploded.url
    console.log('this is the upload object :- ', uploded, 'this is the public url :- ', url)
    return url
  } catch (error) {
    console.log(error)
  }
}
