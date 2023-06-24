import { ChangeEvent, FC, useMemo, useState, useContext } from "react";
import { GetServerSideProps } from 'next'
import Layout from "@/components/layouts/Layout"
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from "@mui/material"
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { Entry, EntryStatus } from "@/interfaces/entry";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { getEntriesById } from "@/database/dbEntries";
import { EntriesContext } from "@/context/entries/EntriesContext";
import { getFormatDistanceToNow } from "@/utils/dateFunctions";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ({ entry }) => {
    const { updateEntry, deleteEntry } = useContext(EntriesContext)
    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);
    }

    const onSave = () => {
        // no vamos a permitir entradas sin texto
        if (inputValue.trim().length === 0) return

        // como no queremos sobreescribir la entry entera, solo cambiamos el
        // status y la description
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry(updatedEntry, true)
    }



    return (
        <Layout title={inputValue.substring(0, 20) + "..."}>
            <Grid
                container
                justifyContent="center"
                sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada:`}
                            subheader={`Creada ${getFormatDistanceToNow(entry.createdAt)}`} />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Actualizar Entrada"
                                autoFocus
                                multiline
                                label="Nueva entrada"
                                value={inputValue}
                                onChange={onInputValueChanged}
                                helperText={isNotValid && "Ingrese un valor"}
                                onBlur={() => setTouched(true)}
                                error={isNotValid}
                            />
                            <FormControl>
                                <FormLabel>Estado:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}>
                                    {validStatus.map(option => (
                                        <FormControlLabel key={option}
                                            value={option}
                                            control={<Radio />}
                                            label={capitalize(option)}
                                        />
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveAsOutlinedIcon />}
                                variant="contained"
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{
                position: "fixed", bottom: 30, right: 30,
                backgroundColor: "error.dark"
            }} onClick={() => deleteEntry(entry._id)}>
                <DeleteForeverOutlinedIcon  />
            </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    // el ctx.params nos trae lo que le mandamos en la url, en este caso el id
    // desestructuramos del ctx los params
    // aca aclaramos en ts que los paramos van a venir como un string
    const { id } = params as { id: string }
    const entry = await getEntriesById(id)

    if (!entry) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }

    return {
        props: {
            entry,  
        }
    }
}

export default EntryPage