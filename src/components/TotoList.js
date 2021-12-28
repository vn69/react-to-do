import { memo } from "react";
import Button from "./Button";

function TotoList({ todoListData, onHandleDelete, onHandleCheck }) {
  console.log("todo=re-render");
  return (
    <div>
      <ul className="item-wrap">
        {todoListData.map((todo, index) => (
          <li
            key={todo.id}
            className={["item", todo.isComplete && "done"].join(" ")}
          >
            <input
              type="checkbox"
              checked={todo.isComplete}
              onChange={() => onHandleCheck(todo.id)}
            ></input>
            <span
              className="name f-1"
              onClick={() => onHandleCheck(todo.id)}
            >{`${index + 1}.  ${todo.name}`}</span>
            <Button onClick={() => onHandleDelete(todo.id)}>Delele</Button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default memo(TotoList);
