import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ITEM_HEIGHT} from '../../constants';
import {TApartment} from '../../types';
import Slider from '../Slider';

type TProps = {
  visible: boolean;
  data: TApartment[];
  sliderRef: React.Ref<ScrollView>;
  onScrollHandler: (index: number) => void;
  setVisible: (visible: boolean) => void;
};

const MainModal: React.FC<TProps> = ({
  visible,
  data,
  sliderRef,
  onScrollHandler,
}) => {
  const height = useSharedValue(0);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
    };
  });

  useEffect(() => {
    height.value = visible ? ITEM_HEIGHT : 0;
  }, [visible]);

  return (
    <View
      style={styles.container}>
      <Animated.View style={animatedHeight}>
        <Slider data={data} ref={sliderRef} onScroll={onScrollHandler} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24
  }
});

export default MainModal;
