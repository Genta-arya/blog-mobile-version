import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import splash from "../Asset/Header.png"
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Tabs'); // Ganti 'Tabs' dengan nama route komponen tab utama
    }, 3000); // Tampilkan splash screen selama 3 detik
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={splash}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
