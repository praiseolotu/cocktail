import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("p");
  const [cocktails, setCocktails] = useState([]);
  // we use the useCallback to check if something changes in the fetchDrinks function
  // we will only rerender when the searchTerm changes
  // if not do not re render
  const fetchDrinks = useCallback(async () => {
    setIsLoading(true);
    try {
      // we want to make sure that we fetch url with the value in searchTerm
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      // console.log(data);
      const { drinks } = data;
      if (drinks) {
        const newDrinks = drinks.map((item) => {
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          // return an alias name for all the above destructured array
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });
        setCocktails(newDrinks);
      } else {
        setCocktails([]);
      }
      // after getting the data
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // after displaying the error message
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);
  return (
    
    <AppContext.Provider
      value={{ isLoading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
