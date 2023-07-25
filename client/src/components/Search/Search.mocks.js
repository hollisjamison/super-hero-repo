import React, { useState } from 'react'
import Search from './Search'
import { BrowserRouter } from 'react-router-dom'

const MockParentElement = () => {
    const [slug, setSlug] = useState('')

    return (
        <BrowserRouter>
            <Search slug={slug} setSlug={setSlug}/>
        </BrowserRouter>
        
    )
}

export default MockParentElement