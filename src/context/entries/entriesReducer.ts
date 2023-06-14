import { Entry } from "@/interfaces/entry";
import { EntriesState } from "./EntriesProvider";


type entriesActionType =
    | { type: "[Entry] - Add-Entry", payload: Entry }
    | { type: "[Entry] - Entry-Updated", payload: Entry }

// Recibe un estado/accion y produce un nuevo estado
export const entriesReducer = (state: EntriesState, action: entriesActionType): EntriesState => {
    switch (action.type) {
        case "[Entry] - Add-Entry":
            return {
                ...state,
                // todas las entradas del state y le agregamos el payload
                entries: [...state.entries, action.payload]
            }
        case "[Entry] - Entry-Updated":
            return {
                ...state,
                // nuevo arreglo de entradas
                entries: state.entries.map(entry => {
                    // si tiene el mismo id significa que es la entrada
                    // que tengo que modificar
                    if (entry._id === action.payload._id) {
                        entry.status = action.payload.status
                        entry.description = action.payload.description
                    }
                    // regresamos los elementos
                    return entry
                })
            }

        default:
            return state;
    }
}