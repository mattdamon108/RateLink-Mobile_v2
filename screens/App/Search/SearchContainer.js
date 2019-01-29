import React from "react";
import SearchPresenter from "./SearchPresenter";
import { Icon, Subtitle } from "@shoutem/ui";
import { Text } from "react-native";

class SearchContainer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "검색"
    };
  };
  render() {
    return <SearchPresenter />;
  }
}

export default SearchContainer;
