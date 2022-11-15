import React, {useState} from 'react';
import {StyleSheet, Text, } from 'react-native';
import {LatLng, Marker, } from 'react-native-maps';
import Animated, {
  runOnJS,
  SharedValue,
  useDerivedValue,
} from 'react-native-reanimated';
type TProps = {
  coordinate: LatLng;
  onPress: () => void;
  index: number;
  amount?: number;
  active: SharedValue<number>;
};
const CustomMarker: React.FC<TProps> = ({
  coordinate,
  onPress,
  active,
  index,
  amount,
}) => {
  const [opacity, setOpacity] = useState(active.value == index ? 0.3 : 1);

  useDerivedValue(() => {
    return (
      typeof active.value === 'number' &&
      runOnJS(setOpacity)(active.value === index ? 0.3 : 1)
    );
  });

  return (
      <Marker
        coordinate={coordinate}
        key={coordinate.latitude + coordinate.longitude}
        tracksViewChanges={false}
        onPress={onPress}
        opacity={opacity}>
          <Animated.View style={[styles.container]}>
            <Text style={styles.label}>{amount}</Text>
          </Animated.View>
      </Marker>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderRadius: 24 / 2,
    backgroundColor: 'blue',
    borderWidth: 2,
    borderColor: '#fff',
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    color: "#fff",
    fontWeight: "500"
  }
});
