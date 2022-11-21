import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import Animated, {
  runOnJS,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
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
  const [elevation, setElevation] = useState<number>(index);

  const animatedOpacityStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const removeActive = useCallback(async () => {
    if (setTracksViewChanges) {
      setElevation(index);
      opacity.value = withTiming(
        active.value === index ? 0.3 : 1,
        {},
        isFinish => {
          if (isFinish) {
            runOnJS(setTracksViewChanges)(false);
          }
        },
      );
    }
  }, []);

  useDerivedValue(() => {
    return active.value === index
      ? runOnJS(setTracksViewChanges)(true)
      : runOnJS(removeActive)();
  }, []);

  useEffect(() => {
    if (tracksViewChanges) {
      opacity.value = active.value === index ? 0.3 : 1;
      setElevation(10000);
    }
  }, [tracksViewChanges]);

  const markerContentStyle = useMemo(
    () => [styles.marker, animatedOpacityStyle],
    [],
  );

  const markerStyle = useMemo(
    () => ({zIndex: elevation, elevation: elevation}),
    [elevation],
  );

  return (
    <Marker
      coordinate={coordinate}
      style={markerStyle}
      key={coordinate.latitude + coordinate.longitude}
      tracksViewChanges={tracksViewChanges}
      onPress={onPress}>
      <View style={styles.markerContainer}>
        <Animated.View style={markerContentStyle}>
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
