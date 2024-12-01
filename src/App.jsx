import React, { useState } from "react";
import "./App.css";
import { data } from "./data/data.js";
const App = () => {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked,
        };
      }
      return item;
    });
  };
  const handleClick = (id, checked, direction) => {
    if (direction === "LEFT") {
      let copyList = [...leftItems];
      copyList = checkedList(copyList, id, checked);
      setLeftItems(copyList);
    } else {
      let copyList = [...rightItems];
      copyList = checkedList(copyList, id, checked);
      setRightItems(copyList);
    }
  };

  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false,
      };
    });
  };

  const handleTransferBtn = (dir) => {
    if (dir === "LEFT_TO_RIGHT") {
      const copyList = [...leftItems];
      const checkList = copyList.filter((item) => item.checked);
      const unCheckList = copyList.filter((item) => !item.checked);
      setRightItems([...rightItems, ...checkList]);
      setLeftItems(unCheckList);
    } else {
      const copyList = [...rightItems];
      const checkList = copyList.filter((item) => item.checked);
      const unCheckList = copyList.filter((item) => !item.checked);
      setLeftItems([...leftItems, ...checkList]);
      setRightItems(unCheckList);
    }
  };
  return (
    <div className="app">
      <h1>Transfer List</h1>
      <div className="container">
        <div className="box">
          {leftItems.map(({ title, id, checked }) => (
            <div
              onClick={() => handleClick(id, checked, "LEFT")}
              className={`item ${checked && "checked"}`}
              id={id}
              key={id}
            >
              {title}
            </div>
          ))}
        </div>
        <div className="actions">
          <button onClick={() => handleTransferBtn("LEFT_TO_RIGHT")}>
            Left
          </button>
          <button onClick={() => handleTransferBtn("Right_TO_LEFT")}>
            Right
          </button>
        </div>
        <div className="box">
          {rightItems.map(({ title, id, checked }) => (
            <div
              onClick={() => handleClick(id, checked, "Right")}
              className={`item ${checked && "checked"}`}
              id={id}
              key={id}
            >
              {title}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
