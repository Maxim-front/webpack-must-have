import renderer from "react-test-renderer";
import Home from "./home";

it("Link changes the class when hovered", () => {
  const component = renderer.create(<Home />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
