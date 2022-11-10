import React, {useCallback} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {DIFFERENCE_X, width} from '../../constants';
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
        onScroll(event.nativeEvent.contentOffset.x / (width - DIFFERENCE_X))},
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
          <SliderItem itemData={item} key={item.id} index={index} isLast={data.length - 1 === index} />
        ))}
      </ScrollView>
    );
  },
);

export default Slider;
