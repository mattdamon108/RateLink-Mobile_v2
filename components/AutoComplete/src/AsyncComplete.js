import React from "react";
import { Modal, View as NativeView } from "react-native";
import {
  View,
  Subtitle,
  Text,
  Button,
  Icon,
  TextInput,
  TouchableOpacity,
  Spinner
} from "@shoutem/ui";
import { ScrollView } from "react-native-gesture-handler";

class AsyncComplete extends React.Component {
  state = {
    isOpen: false,
    options: [],
    isLoading: false
  };

  _controlModal = visible => {
    this.setState({
      isOpen: visible
    });
  };

  _handleChangeText = async text => {
    const { loadAsync } = this.props;

    this.setState({ isLoading: true });

    const results = await loadAsync(text);

    this.setState({
      options: results,
      isLoading: false
    });
  };

  render() {
    const { onSelect, selected } = this.props;
    const { isOpen, options, isLoading } = this.state;
    return (
      <View>
        <View styleName="horizontal v-center">
          <Button
            style={{ flex: 1, backgroundColor: "#eee" }}
            onPress={() => this._controlModal(true)}
          >
            <Subtitle style={{ marginTop: 10, marginBottom: 10 }}>
              {selected.length > 0 ? selected[0].label : "선택없음"}
            </Subtitle>
            <Icon name="drop-down" />
          </Button>
          <TouchableOpacity
            onPress={() => onSelect()}
            style={{
              position: "absolute",
              right: 0,
              paddingLeft: 10,
              paddingRight: 10
            }}
          >
            <Icon name="close" style={{ color: "#ccc" }} />
          </TouchableOpacity>
        </View>
        <Modal
          visible={isOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={() => console.log("Modal closed!")}
        >
          <NativeView
            style={{
              flex: 1,
              padding: 15,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.2)"
            }}
          >
            <NativeView
              style={{
                flex: 1,
                backgroundColor: "#eee",
                width: "100%",
                borderRadius: 10
              }}
            >
              <View
                styleName="horizontal h-end"
                style={{
                  marginTop: 30,
                  marginRight: 5
                }}
              >
                <Text>{options.length}개 찾음</Text>
              </View>
              <TextInput
                autoComplete="off"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => this._handleChangeText(text)}
                placeholder="Search"
                style={{
                  marginTop: 5,
                  marginBottom: 20,
                  marginLeft: 5,
                  marginRight: 5
                }}
              />
              <ScrollView>
                {options.length > 0 ? (
                  options.map((option, index) => (
                    <Button
                      styleName="clear"
                      key={index}
                      onPress={() => {
                        onSelect(option);
                        this._controlModal(false);
                      }}
                    >
                      <Subtitle styleName="md-gutter-vertical">
                        {option.label}
                      </Subtitle>
                    </Button>
                  ))
                ) : (
                  <View styleName="horizontal h-center">
                    {isLoading ? (
                      <Spinner />
                    ) : (
                      <Text>검색어를 입력하세요.</Text>
                    )}
                  </View>
                )}
              </ScrollView>
              <Button
                styleName="clear"
                onPress={() => this._controlModal(false)}
                style={{ paddingTop: 20, paddingBottom: 20 }}
              >
                <Icon name="close" />
              </Button>
            </NativeView>
          </NativeView>
        </Modal>
      </View>
    );
  }
}

export default AsyncComplete;
