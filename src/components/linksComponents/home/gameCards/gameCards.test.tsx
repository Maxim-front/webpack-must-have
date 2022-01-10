import renderer from "react-test-renderer";
import Gamecards from "./gameCards";

it("Link changes the class when hovered", () => {
  const items = [
    {
      id: 4,
      age: "18",
      image: "https://image.api.playstation.com/vulcan/img/cfn/1…xbsFG1pGOWmqhZsxnNkrU3GXbdXIowBAstzlrhtQ4LCI4.png",
      title: "Minecraft",
      price: 3.99,
      platform: "pc",
      text: "minecraft",
      rating: 3,
    },
  ];
  const component = renderer.create(<Gamecards items={items} title="game cards" />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
