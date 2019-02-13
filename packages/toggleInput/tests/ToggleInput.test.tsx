import React from "react";
import { mount } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";
import { ToggleInput } from "../";
import { InputAppearance } from "../../shared/types/inputAppearance";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("ToggleInput", () => {
  it("renders all appearances", () => {
    Object.keys(InputAppearance).forEach(appearance => {
      const component = mount(
        <ToggleInput
          id="defaultId"
          inputLabel="Sample label"
          value="default"
          appearance={InputAppearance[appearance]}
        />
      );
      expect(toJson(component)).toMatchSnapshot();
    });
  });
});