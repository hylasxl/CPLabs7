import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {
  const [location, setLocation] = useState("")
  const [data, setData] = useState(null)
  const buttonHandler = async () => {

    if (location == "") return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b1ceeb752f5993c99c78eacda477e518&lang=vi&units=metric`
    console.log(url);

    await fetch(url).then(res => res.json()).then(res => setData(res)).then(console.log(data))
  }

  const getWindDirection = (deg) => {
    if (deg >= 0 && deg < 45) return 'North';
    if (deg >= 45 && deg < 90) return 'Northeast';
    if (deg >= 90 && deg < 135) return 'East';
    if (deg >= 135 && deg < 180) return 'Southeast';
    if (deg >= 180 && deg < 225) return 'South';
    if (deg >= 225 && deg < 270) return 'Southwest';
    if (deg >= 270 && deg < 315) return 'West';
    return 'Northwest';
  };
  return (
    <View style={styles.container}>
      <Text>WEATHER FORECAST</Text>
      <TextInput placeholder="City" style={styles.input} onChangeText={(e) => setLocation(e)} />
      <Button style={styles.button} title='Go!' onPress={buttonHandler}></Button>
      <StatusBar style="auto" />
      {data && data.cod != 404 && (
        <View style={{ marginTop: 50, padding: 30, borderWidth: 2 }}>
          <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "700" }}>{data.name},{data.sys.country}</Text>
          <Text style={{ marginTop: 20, textAlign: "center", fontSize: 28, fontWeight: 700 }}>{data.weather[0].main}({(data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1))})</Text>
          <Text style={{ fontSize: 28, textAlign: "center", fontWeight: 700 }}>{(data.main.temp).toFixed(2)} </Text>
          <View style={{ alignItems: 'center', marginVertical: 10 }}>
            <Image
              source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }}
              style={{ width: 100, height: 100 }}
            />
          </View>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Wind Speed: {(data.wind.speed)}m/s ({getWindDirection(data.wind.deg)})</Text>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Pressure: {(data.main.pressure)} hPa</Text>
          <Text style={{ fontSize: 20, fontWeight: 700 }}>Humidity: {(data.main.humidity)}%</Text>

        </View>
      )}
      {data && data.cod == 404 && (
        <View>
          <Text style={{ color: "red" }}>City not found</Text>
        </View>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 0,
    padding: 10,
    margin: 10,
    width: 350,
    borderBottomWidth: 1
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});