module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: [
          '.ios.js',
          '.android.js',
          '.ios.tsx',
          '.android.tsx',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json'
        ],
        // alias: {
        //   '@assets': ['./src/assets'],
        //   '@components': ['./src/components'],
        //   '@constants': ['./src/constants'],
        //   '@helpers': ['./src/helpers'],
        //   '@hooks': ['./src/hooks'],
        //   '@reducers': ['./src/reducers'],
        //   '@screens': ['./src/screens'],
        //   '@services': ['./src/services'],
        //   '@types': ['./src/types'],
        //   '@httpServices': ['./src/services/http/services']
        // },
        cwd: 'packagejson'
      }
    ],
    'react-native-reanimated/plugin',
  ],
};