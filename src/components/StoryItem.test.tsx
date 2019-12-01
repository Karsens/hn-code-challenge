import React from "react";
import renderer from "react-test-renderer";

import App from "./StoryItem";
import { Story } from "../reducer";

//dummy story to test with
const story: Story = {
  by: "TestUser",
  descendants: 1,
  id: 1,
  kids: [],
  score: 10,
  time: Date.now(),
  title: "Test",
  type: "story",
  url: "https://google.nl/"
};

describe("Index runs", () => {
  //snapshot test
  it("renders correctly", () => {
    const tree = renderer
      .create(<App index={1} page={1} story={story} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  //unit test
  it("has 1 child", () => {
    const tree = renderer
      .create(<App index={1} page={1} story={story} />)
      .toJSON();
    expect(tree.children.length).toBe(2);
  });
});
