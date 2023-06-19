import { connectDB, disconnectDB } from '@/database/db'
import EntryModel, { IEntry } from '@/models/Entry'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data = 
 {message: string}
 | IEntry


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    const { id } = req.query

    // validaciones
    // si el id no es valido retorna un 400
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: "El id no es valido " + id })
    }


    switch (req.method) {
        case "PUT":
            return updateEntry(req, res)

        default:
            return res.status(400).json({ message: "metodo no exisiste" });
    }

}

const updateEntry = async( req:NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query
    await connectDB()

    const entryToUpdate = await EntryModel.findById(id)
    if (!entryToUpdate) {
        await disconnectDB()
        return res.status(400).json({ message: "No hay entrada con ese id" });
    }

    const {
        // si viene la descrition la uso sino uso entryToUpdate.description
        description=entryToUpdate.description,
        // lo mismo que arriba
        status = entryToUpdate.status
    } = req.body;

    const updatedEntry = await EntryModel.findByIdAndUpdate(id, {description, status},
        // revisa que los estados sean uno de los permitidos y new para que nos mande y nos 
        // regrese la info actualizada
        {runValidators: true, new:true})

        res.status(200).json(updatedEntry!);
}