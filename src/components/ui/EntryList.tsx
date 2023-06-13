import { useMemo } from "react"
import { Paper, List } from '@mui/material';
import EntryCard from './EntryCard';
import { EntryStatus } from '@/interfaces/entry';
import { FC, useContext } from 'react';
import { EntriesContext } from '@/context/entries/EntriesContext';


interface Props {
    status: EntryStatus
}

const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext)

    // Lo memoriza cuando las entries cambian, que seria la dependencia
    // memoriza el filtrer cada vez que entries cambie
    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), 
    [entries])






    return (
        // usamos div pq vamos a necesitar ciertos metodos para el drag and drop
        <div>
            <Paper sx={{
                height: "calc(100vh - 250px)", overflow: "auto", padding: "1px 5px",
                backgroundColor: "transparent", "&::-webkit-scrollbar": {
                    width: 10,
                }, "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "grey",
                    borderRadius: 1,
                }
            }}>
                <List sx={{ opacity: 1 }}>
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