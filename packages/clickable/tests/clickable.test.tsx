import React from "react";

import { shallow } from "enzyme";
import Clickable from "../components/clickable";

describe("Clickable", () => {
  it("has onClick function", () => {
    const action = jest.fn();
    const wrapper = shallow(
      <Clickable action={action}>
        <span>onClick</span>
      </Clickable>
    );
    wrapper.simulate("click");
    expect(action).toHaveBeenCalled();
  });

  it("has onKeyPress function and reacts on space", () => {
    const action = jest.fn();
    const wrapper = shallow(
      <Clickable action={action}>
        <span>onKeyPress</span>
      </Clickable>
    );
    wrapper.simulate("keyPress", {
      key: " ",
      keyCode: 32,
      which: 32
    });
    expect(action).toHaveBeenCalled();
  });

  it("has onKeyPress function and reacts on Enter", () => {
    const action = jest.fn();
    const wrapper = shallow(
      <Clickable action={action}>
        <span>onKeyPress</span>
      </Clickable>
    );
    wrapper.simulate("keyPress", {
      key: "Enter",
      keyCode: 13,
      which: 13
    });
    expect(action).toHaveBeenCalled();
  });
  it("does not react on e keypress", () => {
    const action = jest.fn();
    const wrapper = shallow(
      <Clickable action={action}>
        <span>onKeyPress</span>
      </Clickable>
    );
    wrapper.simulate("keyPress", {
      key: "e",
      keyCode: 69,
      which: 69
    });
    expect(action).not.toHaveBeenCalled();
  });
  describe("tabIndex", () => {
    it("default value", () => {
      const action = jest.fn();
      const wrapper = shallow(
        <Clickable action={action}>
          <span>default tabIndex</span>
        </Clickable>
      );
      expect(
        wrapper
          .find("span")
          .props()
          .tabIndex.toString()
      ).toEqual("-1");
    });

    it("takes 10 as a value", () => {
      const action = jest.fn();
      const wrapper = shallow(
        <Clickable action={action} tabIndex="10">
          <span>default tabIndex</span>
        </Clickable>
      );
      expect(
        wrapper
          .find("span")
          .props()
          .tabIndex.toString()
      ).toEqual("10");
    });
  });
});