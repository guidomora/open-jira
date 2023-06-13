import { FC, ReactNode, useReducer, PropsWithChildren } from "react";
import { EntriesContext } from "./EntriesContext";
import { entriesReducer } from "./entriesReducer";
import { Entry } from "@/interfaces/entry";
import { v4 as uuidv4 } from 'uuid';



// No es lo mismo que en el EntriesContext, esta va a ser la interfaz del estado
export interface EntriesState {
    entries: Entry[];
    children?: JSX.Element
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id:uuidv4(),
            description: "Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status:"pending",
            createdAt: Date.now(),
        },
        {
            _id:uuidv4(),
            description: "En progreso Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status:"in-progress",
            createdAt: Date.now() - 100000,
        },
        {
            _id:uuidv4(),
            description: "finalizado Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status:"finished",
            createdAt: Date.now() - 120000,
        },
    ]
}


// Creamos el provider
const EntriesProvider = ({children}:PropsWithChildren) => {
  
    // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

    const addNewEntry = (description:string) => {
        const newEntry: Entry = {
            _id: uuidv4(),
            description,
            createdAt: Date.now(),
            status: "pending"
        }
        dispatch({type:"[Entry] - Add-Entry", payload: newEntry})
    }

    return (
    <EntriesContext.Provider value={{
        ...state,
        addNewEntry,
    }}>
        {children}
    </EntriesContext.Provider>
  )
}

export default EntriesProvider