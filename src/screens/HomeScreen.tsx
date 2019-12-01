import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  View,
  FlatList
} from "react-native";
import { connect } from "react-redux";

import getStories from "../api/getStories";
import { Story } from "../reducer";
import StoryItem from "../components/StoryItem";

const { height } = Dimensions.get("window");

type Props = {
  getStories: () => void;
  stories: {
    storiesById: Story[];
  };
  allStories: string[];
};

class HomeScreen extends React.Component<Props> {
  state = { page: 1, refreshing: false };
  componentDidMount() {
    this.props.getStories();
  }

  refresh = () => {
    this.setState({ refreshing: true });
    this.props.getStories();
    this.setState({ refreshing: false });
  };

  renderItem = ({ item, index }) => {
    const { stories } = this.props;
    const { page } = this.state;
    const story = stories.storiesById[item];
    return <StoryItem index={index} page={page} story={story} />;
  };

  getPage = page => {
    const STORIES_PER_PAGE = 100;
    const { allStories } = this.props;

    return allStories.slice(
      (page - 1) * STORIES_PER_PAGE,
      page * STORIES_PER_PAGE
    );
  };

  renderPages() {
    return (
      <View style={styles.pages}>
        {[1, 2, 3, 4, 5].map(page => (
          <TouchableOpacity
            key={page}
            style={styles.page}
            onPress={() => this.setState({ page })}
          >
            <Text
              style={{
                fontSize: 25,
                color: this.state.page === page ? "white" : "black"
              }}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>HackerNews</Text>

          {this.renderPages()}
        </View>

        <FlatList
          onRefresh={() => {
            this.props.getStories();
            console.log("refresh");
          }}
          refreshing={this.state.refreshing}
          extraData={this.state.page}
          style={styles.list}
          data={this.getPage(this.state.page)}
          keyExtractor={item => `${item}`}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const ConnectedHomeScreen = connect(
  ({ data }) => {
    return {
      stories: data.stories,
      allStories: data.allStories
    };
  },
  dispatch => ({
    getStories: getStories(dispatch)
  })
)(HomeScreen);

const styles = StyleSheet.create({
  pages: {
    flexDirection: "row"
  },

  page: { margin: 10 },

  list: {
    backgroundColor: "#f6f6ef",
    height: height - 200
  },

  title: { fontWeight: "bold" },

  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },

  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: "#fd6721",
    width: "100%",
    justifyContent: "center"
  }
});

export default ConnectedHomeScreen;
