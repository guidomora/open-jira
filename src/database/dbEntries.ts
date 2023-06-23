import { isValidObjectId } from "mongoose";
import { connectDB, disconnectDB } from "./db";
import EntryModel, { IEntry } from "@/models/Entry";



export const getEntriesById = async(id:string):Promise<IEntry | null>  => {
    if (!isValidObjectId(id)) return null

    await connectDB()
    // lean trae la info minima necesaria para trabajar si escribimos
    // entry. solo nos arroja las opciones de los atributos que tiene
    // nada mas
    const entry = await EntryModel.findById(id).lean()
    await disconnectDB()

    return JSON.parse(JSON.stringify(entry))
}