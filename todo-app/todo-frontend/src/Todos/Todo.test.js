/* eslint-disable no-unused-vars */
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "./Todo";

describe("<Todo />", () => {
  let component;
  let mockHandler;

  test("renders content", () => {
    mockHandler = jest.fn();
    component = render(<Todo text={"Implement first test"} done={"This todo is done"} />);
    const testDiv = screen.getByTestId("todo-contents");
    expect(testDiv).toHaveTextContent("Implement first test");
    expect(testDiv).toHaveTextContent("This todo is done");
  });
});
