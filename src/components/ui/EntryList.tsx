import { useMemo, DragEvent } from "react"
import { Paper, List } from '@mui/material';
import EntryCard from './EntryCard';
import { EntryStatus } from '@/interfaces/entry';
import { FC, useContext } from 'react';
import { EntriesContext } from '@/context/entries/EntriesContext';
import { UIContext } from "@/context/ui/UIContext";
import styles from "../ui/EntryList.module.css"


interface Props {
    status: EntryStatus
}

const EntryList: FC<Props> = ({ status }) => {
    const { isDragging, endDragging } = useContext(UIContext)
    const { entries, updateEntry } = useContext(EntriesContext)

    // Lo memoriza cuando las entries cambian, que seria la dependencia
    // memoriza el filtrer cada vez que entries cambie
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status),
        [entries])

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault()
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData("text")

        // buscamos las entradas que sea igual al id obtenido arriba
        // el signo de admiracion es para decirle a ts que siempre va a tener
        // un valor (find puede retornar undefined)
        const entry = entries.find(entr => entr._id === id)!
        entry.status = status
        updateEntry(entry)
        endDragging();
    }



    return (
        // usamos div pq vamos a necesitar ciertos metodos para el drag and drop
        <div onDrop={onDropEntry} onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ""}>
            <Paper sx={{
                height: "calc(100vh - 250px)", overflow: "auto", padding: "1px 5px",
                //para modificar la barra de scroll
                backgroundColor: "transparent", "&::-webkit-scrollbar": {
                    width: 10,
                }, "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "grey",
                    borderRadius: 1,
                }
            }}>
                <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}

export default EntryList