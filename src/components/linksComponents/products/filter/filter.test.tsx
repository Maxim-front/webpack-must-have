import React from "react";
import renderer from "react-test-renderer";
import Filter from "./filter";

it("renders correctly", () => {
  const onChange = (value: string, name?: string) => {
    console.log(value, name);
  };

  const component = renderer.create(<Filter onchange={onChange} platform="platform" />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
