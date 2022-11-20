import React, {useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import Animated, {
  runOnJS,
  SharedValue,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {MARKER_SIZE} from '../../constants';
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
  const [tracksViewChanges, setTracksViewChanges] = useState<boolean>(false);
  const opacity = useSharedValue(active.value === index ? 0.3 : 1);

  useDerivedValue(() => {
    runOnJS(setTracksViewChanges)(active.value === index ? true : false);
    return (opacity.value =
      typeof active.value === 'number' && active.value === index ? 0.3 : 1);
  });

  const markerStyle = useMemo(
    () => [styles.marker, {opacity: opacity.value}],
    [opacity.value],
  );

  return (
    <Marker
      coordinate={coordinate}
      key={coordinate.latitude + coordinate.longitude}
      tracksViewChanges={tracksViewChanges}
      onPress={onPress}>
      <View style={styles.markerContainer}>
        <Animated.View style={markerStyle}>
          <Text style={styles.label}>{amount}</Text>
        </Animated.View>
      </View>
    </Marker>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  markerContainer: {
    width: MARKER_SIZE,
    height: MARKER_SIZE,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: MARKER_SIZE / 2,
  },
  marker: {
    width: MARKER_SIZE - 6,
    height: MARKER_SIZE - 6,
    borderRadius: (MARKER_SIZE - 6) / 2,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontWeight: '500',
  },
});
