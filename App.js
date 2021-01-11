import React, { useRef, useState, useMemo } from "react";
import {
  Animated,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  PanResponder,
} from "react-native";
import Slider from "@react-native-community/slider";

const App = () => {
  const posAnim = useRef(new Animated.ValueXY({ x: 100, y: 100 })).current;
  const [speed, setSpeed] = useState(40);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderRelease: ({ nativeEvent: { locationX, locationY } }) => {
          Animated.spring(posAnim, {
            toValue: {
              x: locationX,
              y: locationY,
            },
            tension: speed,
            useNativeDriver: true,
          }).start();
        },
      }),
    [speed]
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer} {...panResponder.panHandlers}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.box,
            {
              transform: [
                { translateX: Animated.add(posAnim.x, -25) },
                { translateY: Animated.add(posAnim.y, -25) },
              ],
            },
          ]}
        >
          <Text>😀</Text>
        </Animated.View>
      </View>
      <Slider
        style={styles.sliderView}
        minimumValue={1}
        maximumValue={100}
        value={speed}
        onValueChange={setSpeed}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff"
  },
  box: {
    backgroundColor: "#61dafb",
    width: 50,
    height: 50,
    borderRadius: 4,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  sliderView: {
    marginHorizontal: 20,
  },
});

export default App;
