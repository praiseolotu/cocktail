import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  const { cocktails, isLoading } = useGlobalContext();
  if (isLoading) {
    return <Loading />;
  }

  if (cocktails.length < 1) {
    return <h2 className="section-title">No Cocktails match your search</h2>;
  }
  return (
    <section className="section">
      <h2 className="section-title">Cocktails</h2>
      <div className="cocktails-center">
        {cocktails.map((each) => {
          // since i am using context API, I am sure that all the props
          // can be passed down right
          return <Cocktail key={each.id} {...each} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
