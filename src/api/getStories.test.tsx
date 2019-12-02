import getStories from "./getStories";

test("Test getStories", () => {
  const mockDispatch = () => null;

  expect(getStories(mockDispatch)).toBeTruthy();
});
