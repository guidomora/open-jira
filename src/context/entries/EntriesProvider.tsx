import { useReducer, PropsWithChildren, useEffect } from "react";
import { EntriesContext } from "./EntriesContext";
import { entriesReducer } from "./entriesReducer";
import { Entry } from "@/interfaces/entry";
import entriesApi from "@/apis/entriesApi";




// No es lo mismo que en el EntriesContext, esta va a ser la interfaz del estado
export interface EntriesState {
    entries: Entry[];
    children?: JSX.Element
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}


// Creamos el provider
const EntriesProvider = ({ children }: PropsWithChildren) => {

    // Como va a menejar el estado el provider
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = async (description: string) => {

        // Ya no le corresponde al front
        // const newEntry: Entry = {
        //     _id: uuidv4(),
        //     description,
        //     createdAt: Date.now(),
        //     status: "pending"
        // }

        // El segundo argumento de una peticion post es la data que queremos mandar
        const {data} = await entriesApi.post<Entry>("/entries", {description})
        dispatch({ type: "[Entry] - Add-Entry", payload: data })
    }

    const updateEntry = (entry: Entry) => {
        dispatch({ type: "[Entry] - Entry-Updated", payload: entry })
    }

    const refreshEntries = async() => {
        const {data} = await entriesApi.get<Entry[]>("/entries")
        dispatch({type:"[Entry] - Refresh-data", payload: data})
    }

    useEffect(() => {
        refreshEntries()
    }, [])


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
}

export default EntriesProvider