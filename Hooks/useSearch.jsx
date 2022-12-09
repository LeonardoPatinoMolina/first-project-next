import { requestApi } from "../Services/requestApi";
import { useDispatch } from "react-redux";
// import { useLocalStorage } from "./useLocalStorage";
// import { useIDB } from "./useIDB";
import { init_characters } from "../context/store/features/charactersRedux";
// import { init_favorites } from "../context/store/features/favoritesRedux";
// import { add_myHero } from "../context/store/features/myherosRedux";
// import { changeTheme } from "../Utilities/changeTheme";
// import { useContext } from "react";
// import { ThemesContext } from "../context/Themes/ThemesState";
// import { v4 as uuidv4 } from "uuid";

export const useSearch = () => {
  const dispatch = useDispatch();
  // const { setTheme } = useContext(ThemesContext);
  // const { readItems } = useIDB("MYHEROS", "myheros");
  // const [storageChar, setStorageChar] = useLocalStorage("CharactersState", []);
  // const [storageTheme, setStorageTheme] = useLocalStorage("theme", "light");

  const initSearch = async (q) => {
    try {
      const res = await requestApi(q);
      const data = res.map((char) => {
        const dato = {
          id: char.id,
          name: char.name,
          img: char.thumbnail.path + "." + char.thumbnail.extension,
        };
        return dato;
      });
      dispatch(init_characters(data));
      return { success: true };
    } catch (err) {
      return { success: false };
    }
    // initializeFavorites();
    // initializeMyHeros();
    // initializeTheme();
  };

  //   const initializeFavorites = () => {
  //     try {
  //       const favoritesStorage = window.localStorage.getItem("FavoritesState");
  //       const storeFavParse = JSON.parse(favoritesStorage);

  //       if (storeFavParse.length === undefined) {
  //         const auxArray = [storeFavParse];
  //         dispatch(init_favorites(auxArray));
  //       } else dispatch(init_favorites(storeFavParse));
  //     } catch (error) {
  //       dispatch(init_favorites([]));
  //       console.log(error);
  //     }
  //   };

  //   const initializeMyHeros = () => {
  //     readItems(take_charge_myheros);
  //   };
  //   function take_charge_myheros(charge) {
  //     let resCharge = charge;
  //     resCharge.img = "";
  //     dispatch(add_myHero(resCharge));
  //   }
  //   const initializeTheme = () => {
  //     setTheme(storageTheme);
  //     changeTheme(storageTheme);
  //   };
  return initSearch;
};
