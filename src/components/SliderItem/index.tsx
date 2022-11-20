import React, {useMemo} from 'react';
import {Image, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import assets from '../../assets';
import {
  ITEM_HEIGHT,
  ITEM_WIDTH,
} from '../../constants';
import {TApartment} from '../../types';

type TProps = {
  itemData: TApartment;
  styleContainer?:StyleProp<ViewStyle>;
};
const SliderItem: React.FC<TProps> = ({itemData, styleContainer}) => {

  const imageUri = useMemo(
    () =>
      itemData?.images && itemData?.images[1] && itemData?.images[1].thumbnail
        ? {uri: itemData.images[1].thumbnail}
        : assets.images.default_apartment,
    [],
  );

 const containerStyle = useMemo(() => [styles.container, styleContainer], [styleContainer]);


  return (
    <View
      style={containerStyle}>
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
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    height: ITEM_HEIGHT / 10 * 8,
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
