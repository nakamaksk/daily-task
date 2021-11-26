import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import  { container } from './test_common'
import ListPlan from "../src/ListPlan";
import Schedule from "./Schedule";

test('aaa', () => {
  act(() => {
    render(<Schedule text="test"/>, container);
  });
  expect(container.querySelector("pre").textContent).toBe("test");
})