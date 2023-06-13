import { Button, Box, TextField } from '@mui/material'
import React, { useState, ChangeEvent, useContext } from 'react'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '@/context/entries/EntriesContext';
import { UIContext } from '@/context/ui/UIContext';



const NewEntry = () => {
  const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)
  const {addNewEntry} = useContext(EntriesContext)

  const [touched, setTouched] = useState(false)
  const [inputValue, setInputValue] = useState("")

  //                               propio de Typescript
  const onTextFileChange = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(event.target.value)
  }

  const onSave = () => {
    if (inputValue.length === 0 ) return
    console.log({inputValue});
    addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue("")
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>
      {
        isAddingEntry ? (
          <Box>
            <TextField fullWidth
              sx={{ marginTop: 2, marginBottom: 1 }} placeholder='Nueva entrada'
              autoFocus multiline label="Nueva entrada"
              helperText="Ingrese un valor"
              value={inputValue}
              onChange={onTextFileChange}
              error={inputValue.length <= 0 && touched}
              onBlur={() => setTouched(true)}
            />
            <Box display="flex" justifyContent="space-between">
              <Button variant='text' onClick={() => setIsAddingEntry(false)}>
                Cancelar
              </Button>
              <Button color='secondary' variant='outlined'
                endIcon={<SaveOutlinedIcon />}
                onClick={onSave}>
                Guardar
              </Button>
            </Box>
          </Box>
        ) : (<Button
           startIcon={<AddCircleOutlineOutlinedIcon />}
          fullWidth variant='outlined' onClick={() => setIsAddingEntry(true)}>
          Agregar Tarea
        </Button>)
      }


    </Box>
  )
}

export default NewEntry