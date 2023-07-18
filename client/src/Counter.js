import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const addToCount = () => {
    setCount(count + 1);
  };

  const renderListItems = () => {
    let array = [];

    for (let i = 0; i < count; i++) {
      array.push(<li>Woo!</li>);
    }

    return <>{array}</>;
  };

  return (
    <div>
      <div>{count}</div>
      <button onClick={addToCount}>+</button>
      <button onClick={() => setCount(count - 1)}>-</button>

      <ul>{renderListItems()}</ul>
    </div>
  );
};

export default Counter;
