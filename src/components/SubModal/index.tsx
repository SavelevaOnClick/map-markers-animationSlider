import React, {useEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {SLIDER_VERTICAL_HEIGHT} from '../../constants';
import {TApartment} from '../../types';
import CalloutSlider from '../CalloutSlider';

type TProps = {
  visible: boolean;
  data: TApartment[];
  position: {
    x: number;
    y: number;
  } | null;
};

const SubModal: React.FC<TProps> = ({visible, data, position}) => {
  const height = useSharedValue(0);

  const animatedHeight = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
      top: position?.y ?? 0,
      left: position?.x ?? 0
    };
  }, [position]);

  const containerStyles = useMemo(
    () => 
      [styles.container, animatedHeight],
    [position],
  );

  useEffect(() => {
    height.value = visible ? SLIDER_VERTICAL_HEIGHT : 0;
  }, [visible]);

  return (
    <Animated.View style={containerStyles}>
      <CalloutSlider data={data} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
    }
})

export default SubModal;
