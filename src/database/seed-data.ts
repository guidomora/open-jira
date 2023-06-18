// La informacion que queremos insertar de manera automatica


interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData:SeedData = {
    entries: [
        {
            description: "Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status: "pending",
            createdAt: Date.now(),
        },
        {
            description: "En progreso Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status: "in-progress",
            createdAt: Date.now() - 100000,
        },
        {
            description: "finalizado Lorem ipsum ipsam veritatis explicabo. Excepturi, dolor repudiandae.",
            status: "finished",
            createdAt: Date.now() - 120000,
        },
    ]
}