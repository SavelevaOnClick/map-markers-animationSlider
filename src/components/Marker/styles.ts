import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    borderTopLeftRadius: 24 / 2,
    borderTopRightRadius: 24 / 2,
    borderBottomRightRadius: 24 / 2,
    backgroundColor: 'pink',
    transform: [
      {
        rotateZ: '-45deg',
      },
    ],
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartPartRight: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'red',
    bottom: 6 / 2,
    borderRadius: 6 / 2,
    left: 0,
  },
  heartPartLeft: {
    position: 'absolute',
    width: 6,
    height: 6,
    backgroundColor: 'red',
    borderRadius: 6 / 2,
    right: 6 / 2,
  },
  heartPartMain: {
    width: 6,
    height: 6,
    backgroundColor: 'red',
    transform: [
      {
        rotateZ: '45deg',
      },
    ],
  },
  heartContainer: {
    transform: [{rotateZ: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 6 / 2,
  },
});
