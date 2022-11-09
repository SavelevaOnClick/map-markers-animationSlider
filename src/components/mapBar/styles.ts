import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 56,
    right: 16,
  },
  zoomInContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  zoomOutContainer: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 24,
  },
  zoomInMain: {
    width: 24,
    height: 3,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  zoomInSub: {
    position: 'absolute',
    height: 24,
    width: 3,
    backgroundColor: 'red',
  },
  zoomOut: {
    width: 24,
    height: 3,
    backgroundColor: 'red',
  },
});
