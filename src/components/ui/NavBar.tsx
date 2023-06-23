import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useContext } from 'react';
import { UIContext } from '@/context/ui/UIContext';
import Link from 'next/link';





const NavBar = () => {

  const { openSideMenu } = useContext(UIContext)

  return (
    // la elevation es como una especie de sombra
    <AppBar position='sticky'>
      <Toolbar>
        <IconButton size='large' edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>
        {/* Le cambiamos el nombre en la importacion para no confundirnos 
        con el Link de material ui */}
        <Link href="/" passHref className='link'>
            <Typography variant='h6'>OpenJira</Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar