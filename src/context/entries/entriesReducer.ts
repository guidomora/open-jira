import { Entry } from "@/interfaces/entry";
import { EntriesState } from "./EntriesProvider";


type entriesActionType = 
| {type: "[Entry] - Add-Entry", payload:Entry }

// Recibe un estado/accion y produce un nuevo estado
export const entriesReducer = (state: EntriesState, action:entriesActionType): EntriesState => {
    switch (action.type) {
        case "[Entry] - Add-Entry":
            return {
                ...state,
                // todas las entradas del state y le agregamos el payload
                entries:[...state.entries, action.payload]
            }
    
        default:
            return state;
    }
}