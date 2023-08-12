import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import bg from '../Asset/bg.jpg';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <Image source={bg} style={styles.logo} />
        <View style={styles.card}>
          <Text style={styles.title}>Istilah Nu</Text>
          <Text style={styles.description}>
            Nahdlatul Ulama (NU) menganut paham Ahlussunah Wal Jama'ah, sebuah
            pola pikir yang mengambil jalan tengah antara ekstrim aqli
            (rasionalis) dengan kaum ekstrim naqli (skripturalis). Karena itu
            sumber pemikiran bagi NU tidak hanya Al-Qur'an, Sunnah, tetapi juga
            menggunakan kemampuan akal ditambah dengan realitas empirik. Cara
            berpikir semacam itu dirujuk dari pemikir terdahulu, seperti Abu
            Hasan Al-Asy'ari dan Abu Mansur Al-Maturidi dalam bidang teologi.
            Kemudian dalam bidang fikih mengikuti empat madzhab; Hanafi, Maliki,
            Syafi'i, dan Hanbali. Sementara dalam bidang tasawuf, mengembangkan
            metode Al-Ghazali dan Junaid Al-Baghdadi, yang mengintegrasikan
            antara tasawuf dengan syariat. Gagasan kembali ke khittah pada tahun
            1984, merupakan momentum penting untuk menafsirkan kembali ajaran
            Ahlussunnah Wal Jamaah, serta merumuskan kembali metode berpikir,
            baik dalam bidang fikih maupun sosial. Serta merumuskan kembali
            hubungan NU dengan negara. Gerakan tersebut berhasil membangkitkan
            kembali gairah pemikiran dan
          </Text>
          <Text style={styles.titleLokasi}>Lokasi</Text>
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: -1.8342907881587442,
                longitude: 109.9663793966808,
                latitudeDelta: 0.003,
                longitudeDelta: 0.003,
              }}>
              <Marker
                coordinate={{
                  latitude: -1.8342907881587442,
                  longitude: 109.9663793966808,
                }}
                title="NU Headquarters"
                description="Nahdlatul Ulama HQ"
              />
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  logo: {
    width: '100%',
    height: 150,
  },
  card: {
    backgroundColor: 'white',
    flex: 1,
    margin: 10,
    padding: 10,
    borderRadius: 20,
    elevation: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleLokasi: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    color: '#888',
    fontSize: 16,
  },
  mapContainer: {
    flex: 1,
    margin: 10,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
    width: '100%',
    height: 350,
  },
});

export default AboutScreen;
