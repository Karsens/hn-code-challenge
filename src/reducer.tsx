export type Story = {
  id: number;
  title: string;
  url: string;
  by: string;
  score: number;
  time: number;
  type: string;
  kids: number[];
  descendants: number;
};

export type Store = {
  stories: { storiesById: Object };
  allStories: string[];
};

export type ReduxAction = {
  type: string;

  // #toRemember put different values under different keys, to make clear the type
  story?: Story;
  pending: boolean;
  error: any;
};

const initReducer: Store = {
  stories: {
    storiesById: {}
  },
  allStories: []
};

export const reducer = (
  state: Store = initReducer,
  action: ReduxAction
): Store => {
  switch (action.type) {
    case "GET_TOP_STORIES": {
      return {
        ...state,
        allStories: action.allStories
      };
    }

    case "SET_STORY": {
      const stories = state.stories.storiesById || {};
      return {
        ...state,
        stories: {
          storiesById: { ...stories, [action.story.id]: action.story }
          //   stories: stories.concat([action.story])
        }
      };
    }

    case "PURGE": {
      return {
        ...initReducer
      };
    }

    default:
      return state;
  }
};
