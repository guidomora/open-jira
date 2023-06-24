



export interface Entry {
    _id: string;
    description:string;
    createdAt:number;
    status:EntryStatus 
}

export interface EntryId {
    _id:string
}

// Se podria usar una interface tamb. La unica diferencia es que las
// interfaces se pueden expandir y los types no
export type EntryStatus = "pending" | "in-progress" | "finished"