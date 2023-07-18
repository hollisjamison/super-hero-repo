import React, {useState} from 'react'
import Counter from "./Counter";

const Toggle = () => {
    const [isTrue, setIsTrue] = useState(true)

    return (
        <div>
            <p>Is the light turned on?</p>
            {isTrue ? <Counter/> : null}
            <button onClick={() => setIsTrue(!isTrue)}>Toggle</button>
        </div>
    )
}

export default Toggle