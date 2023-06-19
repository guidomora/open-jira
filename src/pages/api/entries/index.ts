import { connectDB, disconnectDB } from '@/database/db'
import EntryModel, { IEntry } from '@/models/Entry'
import type { NextApiRequest, NextApiResponse } from 'next'



// la entrada es de una forma o la otra
type Data = { message: string }
    | IEntry[]
    | IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    // vamos a tener 2 endpoints 1 para crear y 1 para obtenerlos
    switch (req.method) {
        // si el metodo es get
        case "GET":
            return getEntries(res);
        case "POST":
            return postEntry(req, res)
        // si el metodo no es get
        default:
            return res.status(400).json({ message: 'No existe Endpoint' })
    }

}

// Leer la base de datos
const getEntries = async (res: NextApiResponse<Data>) => {
    // igual que antes, los codigos que interactuan con la db van en el 
    // medio del connect y el disconnect
    await connectDB();

    const entries = await EntryModel.find().sort({ createdAt: "ascending" })

    await disconnectDB()


    res.status(200).json(entries)
}


// 
const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = "" } = req.body
    console.log(req.body);

    // la descripcion que nos manda la persona, pero el createdAt lo definimos
    // nosotros
    const newEntry = new EntryModel({
        description,
        createdAt: Date.now(),
    })

    // como puede fallar la conexion usamos un trycatch
    try {
        await connectDB()

        // hacemos la insercion
        await newEntry.save()


        await disconnectDB()
        return res.status(201).json(newEntry)
    } catch (error) {
        await disconnectDB()
        console.log(error);
        return res.status(500).json({ message: "Algo salio mal, revisar consola del servidor" })
    }
}
