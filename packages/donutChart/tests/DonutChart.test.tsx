import React from "react";
import { shallow } from "enzyme";
import * as emotion from "emotion";
import { createSerializer } from "jest-emotion";
import toJson from "enzyme-to-json";

import { DonutChart } from "../";

expect.addSnapshotSerializer(createSerializer(emotion));

describe("DonutChart", () => {
  it("renders default", () => {
    const component = shallow(
      <DonutChart
        data={[
          {
            percentage: 10,
            color: "#F00"
          }
        ]}
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
  it("renders with text and label", () => {
    const component = shallow(
      <DonutChart
        data={[
          {
            percentage: 10,
            color: "#F00"
          }
        ]}
        label="10%"
        text="1 of 10"
      />
    );

    expect(toJson(component)).toMatchSnapshot();
  });
});