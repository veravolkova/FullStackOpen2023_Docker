import React from "react";

const Todo = ({ text, done }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "70%",
        margin: "auto",
      }}
      data-testid="todo-contents"
    >
      <span>{text}</span>
        {done}
    </div>
  );
};

export default Todo;
