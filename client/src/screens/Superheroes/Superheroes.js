import React, { useState, useEffect } from "react";
import SuperheroList from "../../components/SuperheroList/SuperheroList";
import Search from "../../components/Search/Search";
import axios from "axios";
import './Superheroes.css'

const Superheroes = () => {
  const [slug, setSlug] = useState("");
  const [heroes, setHeroes] = useState([]);
  const [filteredHeroes, setFilteredHeroes] = useState([]);

  useEffect(() => {
    const fetchHeroes = async () => {
      // get our list of heroes from our api
      let fetch = await axios.get("http://localhost:1338/api/heroes");

      // update the state of our heroes state with the heroes it found
      setHeroes(fetch.data);
      setFilteredHeroes(fetch.data);
    };

    fetchHeroes();
  }, []);

  useEffect(() => {
    setFilteredHeroes(
      heroes.filter((hero) => {
        if (
          hero.name.toLowerCase().includes(slug.toLowerCase()) ||
          hero.realname.toLowerCase().includes(slug.toLowerCase())
        ) {
          return true;
        } else {
          return false;
        }
      })
    );
  }, [slug]);

  return (
    <div className="page">
      <div className="title">Meet the Heroes</div>
      <div className="subtitle">
        A searchable list of all your favorite heroes
      </div>
      <Search setSlug={setSlug} slug={slug} />
      <SuperheroList heroes={filteredHeroes} />
    </div>
  );
};

export default Superheroes;
