// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

// module.exports = getDefaultConfig(__dirname);
const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  resolver: {
    assetExts: [...defaultConfig.resolver.assetExts, 'db'],
  },
};