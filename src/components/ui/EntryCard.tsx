import { Entry } from '@/interfaces/entry'
import { Card, CardActionArea, CardActions, Typography } from '@mui/material'
import React from 'react'
import { FC } from 'react';

interface Props {
    entry: Entry
}

const EntryCard:FC<Props> = ({entry}) => {
  return (
    <Card sx={{marginBottom:1}}>
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