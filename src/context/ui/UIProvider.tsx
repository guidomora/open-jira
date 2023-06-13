import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext } from "./UIContext";
import { uiReducer } from "./UIReducer";

// No es lo mismo que en el UIContext, esta va a ser la interfaz del estado
export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry:boolean;
    children?:JSX.Element;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry:false
}


// Creamos el provider
const UIProvider = ({children}:PropsWithChildren) => {
  
    // Como va a menejar el estado el provider
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)


  const openSideMenu = () => {
    dispatch({type:"UI - Open Sidebar"})
  }

  const closeSideMenu = () => {
    dispatch({type: "UI - Close Sidebar"})
  }

  const setIsAddingEntry = (isAdding: boolean) => {
    dispatch({type: "UI - Adding Entry", payload: isAdding})
  }

    return (
    <UIContext.Provider value={{
        ...state,

        openSideMenu,
        closeSideMenu,
        setIsAddingEntry,
    }}>
        {children}
    </UIContext.Provider>
  )
}

export default UIProvider