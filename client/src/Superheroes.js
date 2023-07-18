import React, { useState, useEffect } from "react";
import axios from "axios";

const Superheroes = () => {
  const [slug, setSlug] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([])

  useEffect(() => {
    const fetchHeroes = async () => {
      // get our list of heroes from our api
      let fetch = await axios.get("http://localhost:1338/api/heroes");

      // update the state of our heroes state with the heroes it found
      setHeroes(fetch.data);
      setFilteredHeroes(fetch.data)
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    setFilteredHeroes(heroes.filter(hero => {
      if(hero.name.toLowerCase().includes(slug.toLowerCase()) || hero.realname.toLowerCase().includes(slug.toLowerCase())) {
        return true
      } else {
        return false
      }
        
    }))
  }, [slug])

  const heroesDivs = filteredHeroes.map((hero) => {
      return <div>{hero.name} - {hero.realname}</div>;
    });
  

  return (
    <div className="page">
      <div className="title">Meet the Heroes</div>
      <div className="subtitle">
        A searchable list of all your favorite heroes
      </div>
      <input
        type="text"
        name="search"
        onChange={(event) => setSlug(event.target.value)}
      />
      <div className="heroes">{heroesDivs}</div>
    </div>
  );
};

export default Superheroes;
