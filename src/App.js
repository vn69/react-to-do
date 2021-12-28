import { useState, useRef, useCallback, useEffect } from "react";
import { v4 } from "uuid";

import TotoList from "./components/TotoList";
import Button from "./components/Button";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("to-do-list")) || []
  );
  const [isAll, setIsAll] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    // effect;
    localStorage.setItem("to-do-list", JSON.stringify(todoList));
    return () => {
      // cleanup
    };
  }, [todoList]);

  const onAddItem = () => {
    setTodoList((val) => [
      ...val,
      {
        id: v4(),
        name: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue("");
    inputRef.current.focus();
  };

  const onDeleteItem = useCallback((id) => {
    setTodoList((val) => {
      return val.filter((todo) => todo.id !== id);
    });
  }, []);

  const onClear = () => {
    setTodoList((val) => val.filter((todo) => !todo.isComplete));
    setIsAll(false);
  };
  const onChangeAll = () => {
    setTodoList((val) =>
      val.map((todo) => {
        todo.isComplete = !isAll;
        return todo;
      })
    );
    setIsAll((val) => !val);
  };

  const onHandleCheck = useCallback((id) => {
    // copy depp 1
    setTodoList((val) => {
      const newTodoList = JSON.parse(JSON.stringify(val));
      return newTodoList.map((todo) => {
        if (todo.id === id) todo.isComplete = !todo.isComplete;
        return todo;
      });
    });

    // copy depp 2
    // setTodoList((val) => {
    //   const newTodoList = JSON.parse(JSON.stringify(val));
    //   const index = newTodoList.findIndex((item) => item.id === id);
    //   const todo = newTodoList[index];
    //   todo.isComplete = !todo.isComplete;
    //   return newTodoList;
    // });
  }, []);

  const onEnterKey = (e) => {
    if (e.keyCode === 13) onAddItem();
  };

  console.log("app-re-render");
  return (
    <div className="todo-list">
      <h2>To do list:</h2>
      <div className="input-wrap">
        <input
          ref={inputRef}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={onEnterKey}
        ></input>
        <Button isDisable={!inputValue} onClick={onAddItem}>
          Add
        </Button>
      </div>
      <TotoList
        todoListData={todoList}
        onHandleDelete={onDeleteItem}
        onHandleCheck={onHandleCheck}
      ></TotoList>
      <input
        type="checkbox"
        id="all"
        onChange={onChangeAll}
        checked={isAll}
        disabled={!todoList.length}
      />
      <label htmlFor="all">All</label>
      <Button
        onClick={onClear}
        isDisable={
          !(todoList.findIndex((item) => item.isComplete === true) > -1)
        }
      >
        Clear
      </Button>
    </div>
  );
}

export default App;
