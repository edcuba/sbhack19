/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

module.exports = {
  resolver: {
    extraNodeModules: {
        http: path.resolve(__dirname, "node_modules/http-browserify"),
        https: path.resolve(__dirname, "node_modules/https-browserify"),
        os: path.resolve(__dirname, "node_modules/os-browserify"),
        vm: path.resolve(__dirname, "node_modules/vm-browserify"),
        stream: path.resolve(__dirname, "node_modules/stream-browserify"),
        randombytes: path.resolve(__dirname, "node_modules/react-native-randombytes"),
        crypto: path.resolve(__dirname, "externals/crypto")
    }
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
