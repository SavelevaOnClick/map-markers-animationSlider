import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Region} from 'react-native-maps';
import {useSharedValue} from 'react-native-reanimated';
import {CustomMarker, MapBar, Slider} from './components';
import {TApartment} from './types';
import {DIFFERENCE_X, height, width} from './constants';
const polygon = [
  {latitude: 37.790467601045584, longitude: -122.43995681405067},
  {latitude: 37.790467601045584, longitude: -122.4392195418477},
  {latitude: 37.790467601045584, longitude: -122.43857447057964},
  {latitude: 37.79032187603866, longitude: -122.4376068636775},
  {latitude: 37.79017615074437, longitude: -122.43709992617367},
  {latitude: 37.789994126200355, longitude: -122.43686959147452},
  {latitude: 37.789520648321215, longitude: -122.43654705584049},
  {latitude: 37.78875597646487, longitude: -122.43608605116604},
  {latitude: 37.78802786160478, longitude: -122.43580978363752},
  {latitude: 37.787627236395025, longitude: -122.43562538176775},
  {latitude: 37.787481505786644, longitude: -122.43562538176775},
  {latitude: 37.78729947460481, longitude: -122.43562538176775},
  {latitude: 37.78719030867372, longitude: -122.43576351553202},
  {latitude: 37.78704457720366, longitude: -122.43604011833666},
  {latitude: 37.78693541089602, longitude: -122.43622452020645},
  {latitude: 37.78675337836904, longitude: -122.436500787735},
  {latitude: 37.786571345393675, longitude: -122.43696179240942},
  {latitude: 37.786389047001, longitude: -122.43751466274263},
  {latitude: 37.786243578920335, longitude: -122.43825193494557},
  {latitude: 37.7861341464596, longitude: -122.4391732737422},
  {latitude: 37.7861341464596, longitude: -122.44000274688005},
  {latitude: 37.7861341464596, longitude: -122.4407859519124},
  {latitude: 37.786279879724994, longitude: -122.44129288941623},
  {latitude: 37.786498479084294, longitude: -122.44152322411537},
  {latitude: 37.78668051223914, longitude: -122.44175355881453},
  {latitude: 37.78682624442711, longitude: -122.44179982692002},
  {latitude: 37.78700827677461, longitude: -122.4419379606843},
  {latitude: 37.78719030867372, longitude: -122.4419842287898},
  {latitude: 37.787336039856356, longitude: -122.4419842287898},
  {latitude: 37.78755437112675, longitude: -122.4419842287898},
  {latitude: 37.787809266769486, longitude: -122.44207609444857},
  {latitude: 37.788209890992405, longitude: -122.44207609444857},
  {latitude: 37.788573948422446, longitude: -122.44207609444857},
  {latitude: 37.78890170455993, longitude: -122.4419842287898},
  {latitude: 37.78919315988789, longitude: -122.44156949222088},
  {latitude: 37.78944804987788, longitude: -122.44124695658684},
  {latitude: 37.7896300757671, longitude: -122.44097035378216},
  {latitude: 37.789702938988654, longitude: -122.4407859519124},
  {latitude: 37.78984840025967, longitude: -122.44055561721325},
  {latitude: 37.789994126200355, longitude: -122.4403715506196},
  {latitude: 37.790103287989446, longitude: -122.44023308157921},
  {latitude: 37.79017615074437, longitude: -122.44023308157921},
];
const {data} = require('./search.json');

const initialRegion = {
  latitude: 48.3794,
  longitude: 31.1656,
  latitudeDelta: 4,
  longitudeDelta: 4,
};

const aspectRatio = height / width;

const App = () => {
  const mapRef = useRef<MapView>(null);
  const [apartments, setApartments] = useState<TApartment[]>([]);
  const [region, setRegion] = useState(initialRegion);
  const active = useSharedValue(-1);

  const refSlider = useRef<ScrollView>(null);

  const onScrollHandler = useCallback((index: number) => {
    active.value = index;
  }, []);

  const onPressMarker = useCallback(
    ({lat, lon, index}: {lat: number; lon: number; index: number}) =>
      () => {
        console.log('here', index, index * (width - DIFFERENCE_X) )
        active.value = index;
        refSlider.current?.scrollTo({
          x: index * (width - DIFFERENCE_X),
          // x: 50,
          y: 0,
          animated: true,
        });
      },
    [],
  );

  const markers = useMemo(
    () =>
      apartments.length
        ? apartments.slice(0, 5).map((apartment, index) => {
            return (
              <CustomMarker
                key={apartment.id}
                index={index}
                active={active}
                coordinate={{
                  latitude: apartment.address.location.lat,
                  longitude: apartment.address.location.lon,
                }}
                onPress={onPressMarker({...apartment.address.location, index})}
              />
            );
          })
        : [],
    [apartments, active],
  );

  useEffect(() => {
    // axios('https://dev-phoenix.onmap.co.il/v1/properties/search').then(resp => {
    //   setApartments(resp.data.data);
    // });
    setApartments(data);
  }, []);

  const mapZoomIn = () => {
    mapRef?.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta / aspectRatio,
        longitudeDelta: region.longitudeDelta / aspectRatio,
      },
      300,
    );
  };

  const mapZoomOut = () => {
    mapRef?.current?.animateToRegion(
      {
        ...region,
        latitudeDelta: region.latitudeDelta * aspectRatio,
        longitudeDelta: region.longitudeDelta * aspectRatio,
      },
      300,
    );
  };
  const onRegionChangeComplete = useCallback(
    (props: Region) => setRegion(props),
    [],
  );

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        moveOnMarkerPress={false} //doesn't navigate to marker when it's  onPress
        loadingEnabled={true}
        style={styles.map}
        onRegionChangeComplete={onRegionChangeComplete} 
        minZoomLevel={2}
        // provider={PROVIDER_GOOGLE}
        initialRegion={region}>
        {markers.length ? markers : null}
      </MapView>
      <MapBar mapZoomIn={mapZoomIn} mapZoomOut={mapZoomOut} />
      <View style={styles.sliderContainer}>
        <Slider data={apartments.slice(0, 5)} ref={refSlider} onScroll={onScrollHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 20,
  },
});

export default App;
