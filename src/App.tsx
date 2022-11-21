import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import MapView, {
  MapPressEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import Animated, {useSharedValue} from 'react-native-reanimated';
import {
  CustomMarker,
  MainModal,
  MapBar,
  Slider,
  SliderItem,
  SubModal,
} from './components';
import {TApartment} from './types';
import {
  DIFFERENCE_X,
  height,
  ITEM_WIDTH,
  MARKER_SIZE,
  SLIDER_VERTICAL_HEIGHT,
  width,
} from './constants';
import CalloutSlider from './components/CalloutSlider';
import {getModalPosition} from './helpers';

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
  const refSlider = useRef<ScrollView>(null);

  const [region, setRegion] = useState(initialRegion);

  const [apartmentsSlider, setApartmentsSlider] = useState<TApartment[]>([]);
  const [apartmentsCallout, setApartmentsCallout] = useState<
    Record<string, TApartment[]>
  >({});

  const [calloutSliderActiveData, setCalloutSliderActiveData] = useState<
    TApartment[]
  >([]);

  const activeMarker = useSharedValue(-1);
  const activeMarkerCallout = useSharedValue(-1);

  const [subModalPosition, setSubModalPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const [mainModalVisible, setMainModalVisible] = useState<boolean>(false);
  const [subModalVisible, setSubModalVisible] = useState<boolean>(false);

  const onScrollHandler = useCallback((index: number) => {
    activeMarker.value = index;
  }, []);

  const onPressMarker = useCallback(
    (index: number) => () => {
      setSubModalVisible(false);
      activeMarkerCallout.value = -1;
      activeMarker.value = index;
      refSlider.current?.scrollTo({
        x: index * (width - DIFFERENCE_X),
        y: 0,
        animated: true,
      });
      setMainModalVisible(true);
    },
    [],
  );

  const onPressMarkerCallout = useCallback(
    ({lat, lon, index}: {lat: number; lon: number; index: number}) =>
      async () => {
        setMainModalVisible(false);
        activeMarker.value = -1;
        setCalloutSliderActiveData(
          apartmentsCallout[Object.keys(apartmentsCallout).slice(1, 3)[index]],
        );
        const position = await mapRef.current?.pointForCoordinate({
          latitude: lat,
          longitude: lon,
        });
        position &&
          setSubModalPosition(
            getModalPosition(
              position,
              width,
              height,
              SLIDER_VERTICAL_HEIGHT,
              ITEM_WIDTH,
              MARKER_SIZE,
            ),
          );

        activeMarkerCallout.value = index;
        setSubModalVisible(true);
      },
    [apartmentsCallout],
  );

  const markersCallout = useMemo(
    () =>
      Object.keys(apartmentsCallout)
        .slice(1, 3)
        .map((item, index) => {
          return (
            <CustomMarker
              amount={apartmentsCallout[item].length}
              key={item}
              index={index}
              coordinate={{
                latitude: apartmentsCallout[item][0].address.location.lat,
                longitude: apartmentsCallout[item][0].address.location.lon,
              }}
              active={activeMarkerCallout}
              onPress={onPressMarkerCallout({
                ...apartmentsCallout[item][0].address.location,
                index,
              })}
            />
          );
        }),
    [apartmentsCallout, activeMarkerCallout],
  );

  const markers = useMemo(
    () =>
      apartmentsSlider.slice(0, 5).map((apartment, index) => {
        return (
          <CustomMarker
            coordinate={{
              latitude: apartment.address.location.lat,
              longitude: apartment.address.location.lon,
            }}
            onPress={onPressMarker(index)}
            index={index}
            active={activeMarker}
            key={apartment.id}
          />
        );
      }),
    [apartmentsSlider, activeMarker],
  );

  useEffect(() => {
    // axios('https://dev-phoenix.onmap.co.il/v1/properties/search').then(resp => {
    //   setApartments(resp.data.data);
    // });

    const withCallout: TApartment[] = [];
    const withSlider: TApartment[] = [];
    //sorting into two arrays
    data.forEach((element: TApartment) => {
      if (
        data.filter(
          (el: TApartment) =>
            el.address.location.lat === element.address.location.lat &&
            el.address.location.lon === element.address.location.lon,
        ).length > 1
      ) {
        withCallout.push(element);
      } else {
        withSlider.push(element);
      }
    });
    //data transformation array(callout)
    const withCallout_ = withCallout.reduce(
      (acum: Record<string, TApartment[]>, item) => {
        const key = `${item.address.location.lat}${item.address.location.lon}`;
        if (acum.hasOwnProperty(key) && Array.isArray(acum[key])) {
          acum[`${item.address.location.lat}${item.address.location.lon}`].push(
            item,
          );
        } else {
          acum[`${item.address.location.lat}${item.address.location.lon}`] = [
            item,
          ];
        }
        return acum;
      },
      {},
    );

    setApartmentsSlider(withSlider);
    setApartmentsCallout(withCallout_);
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

  const onPressMapHandler = useCallback(
    (event: MapPressEvent) => {
      if (event.nativeEvent.action !== 'marker-press') {
        if (mainModalVisible) {
          setMainModalVisible(false);
          activeMarker.value = -1;
        }
        if (subModalVisible) {
          setSubModalVisible(false);

          activeMarkerCallout.value = -1;
        }
      }
    },
    [mainModalVisible, subModalVisible],
  );

  const onPanDragMapHandler = useCallback(() => {
    if (subModalVisible) {
      setSubModalVisible(false);
      activeMarkerCallout.value = -1;
    }
    if (mainModalVisible) {
      setMainModalVisible(false);
      activeMarker.value = -1;
    }
  }, [subModalVisible, mainModalVisible]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        moveOnMarkerPress={false} //doesn't navigate to marker when it's  onPress
        loadingEnabled={true}
        onPanDrag={onPanDragMapHandler}
        style={styles.map}
        onPress={onPressMapHandler}
        onRegionChangeComplete={onRegionChangeComplete}
        minZoomLevel={2}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}>
        {markersCallout}
        {markers}
      </MapView>
      <MapBar mapZoomIn={mapZoomIn} mapZoomOut={mapZoomOut} />
      <SubModal
        visible={subModalVisible}
        data={calloutSliderActiveData}
        position={subModalPosition}
      />
      <MainModal
        setVisible={setMainModalVisible}
        visible={mainModalVisible}
        data={apartmentsSlider}
        sliderRef={refSlider}
        onScrollHandler={onScrollHandler}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width,
    height,
  },
  sliderContainer: {
    position: 'absolute',
    bottom: 20,
  },
});
