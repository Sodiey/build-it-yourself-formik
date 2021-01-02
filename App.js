import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import AppLoading from 'expo-app-loading';

import UseLogin from 'screens/UserLogin';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('assets/fonts/OpenSans-Regular.ttf'),
    'poppins-400': require('assets/fonts/Poppins-Regular.ttf'),
    'poppins-600': require('assets/fonts/Poppins-SemiBold.ttf'),
    'roboto-400': require('assets/fonts/Roboto-Regular.ttf'),
  });
};

function cacheImages(images) {
  const cacheImages = images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
  return Promise.all(cacheImages);
}

async function _loadAssetsAsync() {
  const images = [require('assets/login.png'), require('assets/logo.png')];
  const imageAssets = cacheImages(images);
  const fontAssets = fetchFonts();

  return Promise.all([imageAssets, fontAssets]);
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        style={{ flex: 1 }}
        startAsync={_loadAssetsAsync}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return <UseLogin />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
