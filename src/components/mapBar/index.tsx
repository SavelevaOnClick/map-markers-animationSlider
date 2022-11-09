import React from 'react';
import {Pressable, View} from 'react-native';
import styles from './styles';

type TProps = {
  mapZoomIn: () => void;
  mapZoomOut: () => void;
};

const TabMapBar: React.FC<TProps> = ({
  mapZoomIn,
  mapZoomOut,
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={mapZoomIn} style={styles.zoomInContainer}>
        <View
          style={styles.zoomInMain}>
          <View
            style={styles.zoomInSub}
          />
        </View>
      </Pressable>
      <Pressable onPress={mapZoomOut} style={styles.zoomOutContainer}>
        <View  style={styles.zoomOut}/>
      </Pressable>

    </View>
  );
};

export default TabMapBar;
