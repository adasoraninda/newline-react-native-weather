import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { fetchLocationId, fetchWeather } from "./utils/api";
import getImageForWeather from "./utils/getImageForWeather";

import SearchInput from "./components/SearchInput";
import { useEffect, useState } from "react";

export default function App() {
  const [valueOnChange, setValueOnChange] = useState("");
  const [valueOnSubmit, setValueOnSubmit] = useState("Unknown");

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({
    location: "",
    weather: "",
    temperature: "0",
  });

  const handleChangeText = (text) => {
    setValueOnChange(text);
  };

  const handleOnSubmit = () => {
    setValueOnSubmit(valueOnChange);
  };

  useEffect(() => {
    handleUpdateLocation(valueOnSubmit);
  }, [valueOnSubmit]);

  useEffect(() => {
    handleUpdateLocation("Jakarta");
  }, []);

  const handleUpdateLocation = async (city) => {
    if (!city) return;

    setValueOnChange("");
    setIsLoading(true);

    try {
      const locationId = await fetchLocationId(city);
      const { location, weather, temperature } = await fetchWeather(locationId);

      setData({
        location,
        weather,
        temperature,
      });

      setIsError(false);
    } catch (e) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={getImageForWeather(data.weather)}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >
        <View style={styles.detailsContainer}>
          <ActivityIndicator animating={isLoading} color="white" size="large" />
          {!isLoading && (
            <View>
              {isError && (
                <Text style={[styles.smallText, styles.textStyle]}>
                  Could not load weather, please try a different city.
                </Text>
              )}
              {!isError && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {data.location}
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {data.weather}
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${Math.round(data.temperature)}°`}
                  </Text>
                </View>
              )}
              <SearchInput
                placeholder="Search any city"
                value={valueOnChange}
                onChangeText={handleChangeText}
                onSubmit={handleOnSubmit}
              />
            </View>
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34495E",
  },
  detailsContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 20,
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  largeText: {
    fontSize: 44,
  },
  smallText: {
    fontSize: 18,
  },
  textStyle: {
    textAlign: "center",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Regular" : "Roboto",
  },
});
