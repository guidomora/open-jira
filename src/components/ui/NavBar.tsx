import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '@/context/ui/UIContext';




const NavBar = () => {

  const {openSideMenu} = useContext(UIContext)

  return (
    // la elevation es como una especie de sombra
    <AppBar position='sticky'>
        <Toolbar>
            <IconButton size='large' edge="start" onClick={openSideMenu}>
                <MenuOutlinedIcon />
            </IconButton>
            <Typography variant='h6'>OpenJira</Typography>
        </Toolbar>
    </AppBar>
  )
}

export default NavBar