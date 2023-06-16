// Creado con el snippet nextapi

import { connectDB, disconnectDB } from '@/database/db'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message:string
}

export default async function (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    // Si el proceso env de node esta en produccion no se va a ejecutar
    if (process.env.NODE_ENV === "production") {
        // 401 significa unauthorized
        return res.status(401).json({message: "No tiene acceso a este servicio"})
    }

    await connectDB()
    await disconnectDB()
    
    res.status(200).json({ message: 'Proceso realizado correctamente' })
}