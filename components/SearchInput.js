import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ placeholder, onChangeText, onSubmit, value }) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCorrect={false}
        placeholder={placeholder}
        placeholderTextColor="white"
        underlineColorAndroid="transparent"
        style={styles.textInput}
        clearButtonMode="always"
        value={value}
        onChangeText={(text) => onChangeText(text)}
        onSubmitEditing={onSubmit}
      />
    </View>
  );
};

export default SearchInput;

SearchInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

SearchInput.defaultProps = {
  placeholder: "",
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#666",
    borderRadius: 6,
    height: 40,
    width: 300,
    marginTop: 20,
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    color: "white",
    flex: 1,
  },
});
