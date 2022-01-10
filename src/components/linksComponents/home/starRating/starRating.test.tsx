import React from "react";
import renderer from "react-test-renderer";
import StarRating from "./starRating";

it("renders correctly", () => {
  const component = renderer.create(<StarRating rating={5} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
