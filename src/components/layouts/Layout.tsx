import { Box } from '@mui/material'
import Head from 'next/head'
import React, { FC, PropsWithChildren, ReactNode } from 'react'
import NavBar from '../ui/NavBar'
import SideBar from '../ui/SideBar'


interface Props {
    title?:string,
    children: ReactNode
}

const Layout:FC<Props> = ({title= "OpenJira", children}) => {
  return (
    <Box sx={{flexFlow:1}}>
        <Head>
            <title>{title}</title>
        </Head>
        <NavBar />
        <SideBar />
        <Box sx={{padding: "10px 20px"}} >
            {children}
        </Box>
    </Box>
  )
}

export default Layout