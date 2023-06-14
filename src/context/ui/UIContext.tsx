// Solo la creacion del context

import { createContext } from 'react';


export interface ContextProps {
     sideMenuOpen:boolean;
     isAddingEntry:boolean;
     isDragging: boolean;

    //  Como esta funcion no regresa nada va que es una funcion y void
     openSideMenu: () => void;
     closeSideMenu: () => void;
     setIsAddingEntry: (isAdding: boolean) => void;
     startDragging: () => void;
     endDragging: () => void;
}

export const UIContext = createContext({

} as ContextProps);