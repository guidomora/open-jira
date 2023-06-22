import { ChangeEvent, useMemo, useState } from "react";
import Layout from "@/components/layouts/Layout"
import { Button, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, capitalize } from "@mui/material"
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import { EntryStatus } from "@/interfaces/entry";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"]

const EntryPage = () => {
    const [inputValue, setInputValue] = useState("")
    const [status, setStatus] = useState<EntryStatus>("pending")
    const [touched, setTouched] = useState(false)

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus);  
    }

    const onSave = () => {
        console.log({inputValue, status});  
    }

    return (
        <Layout title={"........"}>
            <Grid
                container
                justifyContent="center"
                sx={{ marginTop: 2 }}>
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader title={`Entrada:${inputValue}`}
                            subheader={`Creada hace no se cuanto`} />
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
            }}>
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </Layout>
    )
}

export default EntryPage