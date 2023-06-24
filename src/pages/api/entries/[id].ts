import { connectDB, disconnectDB } from '@/database/db'
import EntryModel, { IEntry } from '@/models/Entry'
import mongoose from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'


type Data =
    { message: string }
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
        case "GET":
            return getEntry(req, res)
        case "DELETE":
            return deleteEntry(req, res)

        default:
            return res.status(400).json({ message: "metodo no exisiste" });
    }

}


const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query

    // Me conecto
    await connectDB()
    // Tomo la entrada por el id
    const entryInDB = await EntryModel.findById(id)
    await disconnectDB()
    // si la entrada no existe lanzamos el error
    if (!entryInDB) {
        await disconnectDB()
        return res.status(400).json({ message: "No hay entrada con ese id" });
    }
    return res.status(200).json(entryInDB);
}

const deleteEntry = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    await connectDB()

    const entryToDelete = await EntryModel.findById(id)
    if (!entryToDelete) {
        await disconnectDB()
        return res.status(400).json({ message: "No hay entrada con ese id" });
    }
    
    try {
        const deletedEntry = await EntryModel.deleteOne({_id:id})
        // Validacion
        if (deletedEntry.deletedCount === 1) {
            return res.status(200).json({ message: "Entrada borrada correctamente" });
          } else {
            return res.status(400).json({ message: "No se pudo borrar la entrada" });
          }
    } catch (error:any) {
        console.log({ error });
        await disconnectDB()
        res.status(400).json({ message: error.errors.status.message });
    }
}


const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { id } = req.query
    await connectDB()

    const entryToUpdate = await EntryModel.findById(id)
    if (!entryToUpdate) {
        await disconnectDB()
        return res.status(400).json({ message: "No hay entrada con ese id" });
    }

    const {
        // si viene la description la uso sino uso entryToUpdate.description
        description = entryToUpdate.description,
        // lo mismo que arriba
        status = entryToUpdate.status
    } = req.body;

    try {
        const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status },
            // revisa que los estados sean uno de los permitidos y new para que nos mande y nos 
            // regrese la info actualizada
            { runValidators: true, new: true })
        await disconnectDB()
        res.status(200).json(updatedEntry!);
    } catch (error: any) {
        console.log({ error });
        await disconnectDB()
        res.status(400).json({ message: error.errors.status.message });
    }
}

