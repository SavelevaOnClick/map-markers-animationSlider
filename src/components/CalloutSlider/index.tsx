import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {ITEM_HEIGHT, ITEM_WIDTH} from '../../constants';
import {TApartment} from '../../types';
import SliderItem from '../SliderItem';

type TProps = {
  data: TApartment[];
};

const CalloutSlider: React.FC<TProps> = ({data}) => {
  return (
    <ScrollView
      stickyHeaderIndices={[0]}
      bounces={false}
      decelerationRate="fast"
      snapToInterval={ITEM_HEIGHT}>
      <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>
            {data[0]?.address.en.street_name}
          </Text>
      </View>
      {data.length
        ? data.map((item) => (
            <SliderItem
              itemData={item}
              key={item.id}
              styleContainer={styles.slideContainer}
            />
          ))
        : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerTitle: {      //FIXME: text on center
    fontWeight: '500',
    fontSize: 16,
  },
  slideContainer: {
    height: ITEM_HEIGHT,
    width: ITEM_WIDTH,
  }
});

export default CalloutSlider;
