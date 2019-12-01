function getStories(dispatch) {
  return () => {
    fetch("https://hacker-news.firebaseio.com/v0/topstories.json")
      .then(res => res.json())
      .then(res => {
        dispatch({ type: "GET_TOP_STORIES", allStories: res });

        res.map((item, index) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${item}.json`)
            .then(res => res.json())
            .then(res => {
              dispatch({
                type: "SET_STORY",
                story: res
              });
            });
        });
        if (res.error) {
          throw res.error;
        }
        return res;
      })
      .catch(error => {
        console.log(error);
      });
  };
}

export default getStories;
