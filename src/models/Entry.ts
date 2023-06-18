import { Entry } from "@/interfaces/entry";
import mongoose,  {Model, Schema, mongo} from "mongoose";

// la I es para identificar que es una interface. al extenderla tengo todo lo mismo
// que en Entry pero puedo agregarle cosas, sin que se le sumen a Entry
export interface IEntry extends Entry {

}


// El esquema define la estructura de un documento en MongoDB 
// y las validaciones asociadas a los campos.
const entrySchema = new Schema({
        // la descripcion es obligatoria
        description: {type: String, required:true},
        createdAt: {type: Number},
        status: {
            type:String,
            // como string es muy amplio, usamos una enumeracion 
            enum: {
                values: ["pending", "in-progress", "finished"],
                message: "{VALUE} no es un estado permitido"
            }
        }
})

// es un modelo de datos creado a partir del esquema entrySchema, si ya existe un 
// Entry mongoose usa el existente, sino crea uno nuevo usando el esquema
const EntryModel: Model<IEntry> = mongoose.models.Entry || mongoose.model("Entry", entrySchema)

export default EntryModel