import React, { useCallback, useEffect, useState } from 'react';
import {StyleSheet, View} from 'react-native';
import {LatLng, Marker} from 'react-native-maps';
import Animated, { interpolateColor, runOnJS, SharedValue, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
type TProps = {
  coordinate: LatLng;
  onPress: () => void;
  index: number;
  active: SharedValue<number>;
};
const CustomMarker: React.FC<TProps> = ({coordinate, onPress, active, index}) => {
  const [isTrack, setIsTrack] = useState(false);

  const containerStyleAnimated = useAnimatedStyle(() => {
    
    runOnJS(setIsTrack)(active.value === index  ? true : false)

    return {
      backgroundColor: active.value === index ? "pink" : "white",
    }
  }, [])
  const onPressHandler = useCallback(() => {
      onPress();
  }, [])

  return (
    <Marker coordinate={coordinate} tracksViewChanges={isTrack} onPress={onPressHandler}>
      <Animated.View style={[styles.container, containerStyleAnimated]}>
        <View style={styles.heartContainer}>
          <View style={styles.heartPartMain}>
            <View style={styles.heartPartRight} />
            <View style={styles.heartPartLeft} />
          </View>
        </View>
      </Animated.View>
    </Marker>
  );
};

export default CustomMarker;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderTopLeftRadius: 24 / 2,
    borderTopRightRadius: 24 / 2,
    borderBottomRightRadius: 24 / 2,
    // backgroundColor: 'pink',
    transform: [
      {
        rotateZ: '-45deg',
      },
    ],
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartPartRight: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'red',
    bottom: 6 / 2,
    borderRadius: 6 / 2,
    left: 0,
  },
  heartPartLeft: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'red',
    borderRadius: 6 / 2,
    right: 6 / 2,
  },
  heartPartMain: {
    width: 6,
    height: 6,
    backgroundColor: 'red',
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
  },
  heartContainer: {
    transform: [{rotateZ: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6 / 2,
  },
})

function useSate(arg0: boolean): [any, any] {
  throw new Error('Function not implemented.');
}
