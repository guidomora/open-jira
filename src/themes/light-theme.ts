import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";


export const lightTheme =  createTheme({
    palette:{
        mode:"light",
        background: {
            // color del MUI y le indicamos el nivel de intensidad
            default: grey[300]
        },
        primary: {
            main:"#4a148c"
        },
        secondary: {
            main:"#19857b"
        },
        error: {
            // Seria otra forma de indicar la intensidad
            main: red.A400
        }
    },

    components: {
        // para modificar el componente AppBar, seimpre se agrega el Mui
        // adelante ej MuiToolBar
        MuiAppBar:{
            defaultProps:{
                elevation:0
            },
            // Para modificar el estilo
            styleOverrides: {}
        }   
    }
})