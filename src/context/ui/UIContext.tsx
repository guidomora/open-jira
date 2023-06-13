// Solo la creacion del context

import { createContext } from 'react';


export interface ContextProps {
     sideMenuOpen:boolean;
     isAddingEntry:boolean

    //  Como esta funcion no regresa nada va que es una funcion y void
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setIsAddingEntry: (isAdding: boolean) => void;
     
}

export const UIContext = createContext({

} as ContextProps);