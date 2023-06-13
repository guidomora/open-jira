import { createTheme } from "@mui/material";
import { grey, red } from "@mui/material/colors";

export const darkTheme = createTheme({
    palette: {
        mode: "dark",
        secondary: {
            main: "#19857b"
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
            styleOverrides: {
                root:{
                    backgroundColor: "#4a148c"
                }
            }
        }   
    }
})