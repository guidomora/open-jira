import { Drawer, Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useContext } from 'react';
import { UIContext } from '@/context/ui/UIContext';


const menuItems:string[] = ['Inbox', 'Starred', 'Send email', 'Drafts']

const SideBar = () => {
  const {sideMenuOpen, closeSideMenu} = useContext(UIContext)


  return (
    <Drawer
    anchor='left'
    open={sideMenuOpen}
    onClose={closeSideMenu}
    >
      <Box sx={{width:250}}>

      </Box>
      <Box sx={{padding:"5px, 10px"}}>
        <Typography variant='h4'> Menu</Typography>
      </Box>
      <List>
          {menuItems.map((item, index) => 
            <ListItem component={"button"} key={item} sx={{backgroundColor:"inherit",
            border:"none", cursor:"pointer"}}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
          )}
      </List>
      <Divider />
      <List>
          {menuItems.map((item, index) => 
            <ListItem component={"button"} key={item} sx={{backgroundColor:"inherit",
            border:"none", cursor:"pointer"}}>
                <ListItemIcon>
                  {index % 2 ? <InboxOutlinedIcon /> : <EmailOutlinedIcon />}
                </ListItemIcon>
                <ListItemText primary={item}/>
            </ListItem>
          )}
      </List>
    </Drawer>
  )
}

export default SideBar