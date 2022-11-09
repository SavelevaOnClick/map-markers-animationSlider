import React, {useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import assets from '../../assets';
import {ITEM_OFFSET_X, ITEM_WIDTH, MARGINS, width} from '../../constants';
import {TApartment} from '../../types';
import Image from 'react-native-fast-image';
type TProps = {
  itemData: TApartment;
  index: number;
};

const SliderItem: React.FC<TProps> = ({itemData, index}) => {

  const imageUri = useMemo(
    () =>
      itemData?.images && itemData?.images[1] && itemData?.images[1].thumbnail
        ? {uri: itemData.images[1].thumbnail}
        : assets.images.default_apartment,
    [],
  );

  const containerStyle = useMemo(
    () => [styles.container, index === 0 && {marginLeft: ITEM_OFFSET_X / 2}],
    [],
  );

  return (
    <View style={containerStyle}>
      <Image source={imageUri} style={styles.image} />

      <View style={styles.description}>
        <Text style={styles.title}>{itemData.property_type}</Text>
        <Text>city: {itemData.address.en.city_name}</Text>
        <Text>street: {itemData.address.en.street_name}</Text>
      </View>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 120,
    borderRadius: 12,
    width: ITEM_WIDTH,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    alignItems: 'center',
    marginHorizontal: MARGINS / 2,
    paddingHorizontal: 10,
  },
  image: {
    height: 100,
    width: (ITEM_WIDTH / 3) * 1.5,
    backgroundColor: 'grey',
  },
  description: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
