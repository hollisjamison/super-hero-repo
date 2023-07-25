import React from 'react'
import './Search.css'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Search = (props) => {

    const { slug, setSlug } = props
    const navigate = useNavigate()

    useEffect(() => {
      if(slug === "iron-man") {
        navigate("/heroes/spider-man")
      }
    }, [slug])

    return (
        <input
        type="text"
        name="search"
        onChange={(event) => setSlug(event.target.value)}
        value={slug}
      />
    )
}

export default Search