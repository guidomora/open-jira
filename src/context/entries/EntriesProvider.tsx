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
    entries: []
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

    const updateEntry = (entry:Entry) => {
        dispatch({type: "[Entry] - Entry-Updated", payload: entry})
    }

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