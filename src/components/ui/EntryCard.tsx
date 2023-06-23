import { UIContext } from '@/context/ui/UIContext';
import { Entry } from '@/interfaces/entry'
import { Card, CardActionArea, CardActions, Typography } from '@mui/material'
import { useRouter } from 'next/router';
import React, { DragEvent, useContext } from 'react'
import { FC } from 'react';


interface Props {
    entry: Entry
}

const EntryCard:FC<Props> = ({entry}) => {
  const {startDragging, endDragging} = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (event:DragEvent) => {
    // El set data solo pueden ser strings, si quisieramos meter un objeto
    // hay que usar el json.stringify, "text" seria un nombre de referencia
    event.dataTransfer.setData("text", entry._id)
    startDragging()
  }

  const onClick = () => {
    router.push(`/entries/${entry._id}`)
  }

  return (
    <Card sx={{marginBottom:1}} draggable onDragStart={onDragStart}
    onDragEnd={endDragging} onClick={onClick}>
        <CardActionArea>
            {/* pre-line sirve para que los saltos de linea se muestren */}
            <Typography sx={{whiteSpace:"pre-line"}}>{entry.description}</Typography>
            <CardActions sx={{display:"flex", justifyContent:"flex-end", paddingRight:2}}>
                <Typography variant='body2'>Creado hace:</Typography>
            </CardActions>
        </CardActionArea>
    </Card>
  )
}

export default EntryCard