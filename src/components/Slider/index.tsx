import React, {useCallback} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  DIFFERENCE_X,
  ITEM_HEIGHT,
  ITEM_OFFSET_X,
  ITEM_WIDTH,
  MARGINS,
  width,
} from '../../constants';
import {TApartment} from '../../types';
import SliderItem from '../SliderItem';
type TProps = {
  data: TApartment[];
  onScroll: (index: number) => void;
};

const Slider = React.forwardRef<ScrollView, TProps>(
  ({data, onScroll}, ref: React.LegacyRef<ScrollView>) => {
    const onScrollEndHandler = useCallback(
      (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        onScroll(event.nativeEvent.contentOffset.x / (width - DIFFERENCE_X));
      },
      [],
    );

    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        ref={ref}
        onMomentumScrollEnd={onScrollEndHandler}
        decelerationRate="fast"
        snapToInterval={width - DIFFERENCE_X}>
        {data.map((item, index) => (
          <SliderItem
            itemData={item}
            key={item.id}
            styleContainer={[
              styles.sliderContainer,
              index === 0 && styles.firstSliderContainer,
              data.length - 1 === index && styles.lastSliderContainer,
            ]}
          />
        ))}
      </ScrollView>
    );
  },
);

export default Slider;

const styles = StyleSheet.create({
  sliderContainer: {
    marginHorizontal: MARGINS / 2,
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  },
  lastSliderContainer: {
    marginRight: ITEM_OFFSET_X / 2,
  },
  firstSliderContainer: {
    marginLeft: ITEM_OFFSET_X / 2,
  },
});
