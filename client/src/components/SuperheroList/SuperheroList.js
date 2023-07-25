import React from "react";
import './SuperheroList.css'
import { Link } from 'react-router-dom'

const SuperheroList = (props) => {
  const { heroes } = props;

  const renderHeroes = heroes.map((hero) => {
    return (
      <li key={hero.slug}>
        <Link to={`heroes/${hero.slug}`}>
          {hero.name}
        </Link>
      </li>
    );
  });

  return (
  <ul className="heroesList">{renderHeroes}</ul>
  )
};

export default SuperheroList;
