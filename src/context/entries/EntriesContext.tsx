import { Entry } from '@/interfaces/entry';
import { createContext } from 'react';


export interface ContextProps {
    // Ahora sabemos que el ContextProps va a tener una entrada y tiene que
    // lucir como Entry y que va a ser un array
     entries: Entry[];
     addNewEntry: (description: string) => void;
     updateEntry: (entry: Entry, showSnackBar?:boolean) => void;
     deleteEntry: (entry: Entry) => void
}

export const EntriesContext = createContext({

} as ContextProps);