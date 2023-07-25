import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const HeroInfo = () => {
    const [hero, setHero] = useState({})
    const { heroSlug } = useParams()

    useEffect(() => {
        const fetchHero = async () => {
            let { data } = await axios.get(`http://localhost:1338/api/heroes/${heroSlug}`)

            setHero(data)
            console.log(data)
        }

        fetchHero()
    }, [])

    return (
        <div className="page">
            <div className="title">Hero Information</div>
            <div className="subtitle">Details about our favorite heroes</div>
            <h3>Name: </h3>
            <p>{hero.name}</p>
            <h3>Real Name: </h3>
            <p>{hero.realname}</p>
            <h3>First Appearance: </h3>
            <p>{hero.firstappearance}</p>
            <Link to="/">Go Back</Link>
        </div>
    )
}

export default HeroInfo 