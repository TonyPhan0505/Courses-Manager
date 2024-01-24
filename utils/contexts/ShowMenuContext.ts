//////////////// Import Dependencies //////////////
import { createContext } from 'react';
//////////////////////////////////////////////////

/////////////////////// Context //////////////////////
export const ShowMenuContext = createContext<{
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  }>({
    showMenu: false,
    setShowMenu: () => {}
});
/////////////////////////////////////////////////////