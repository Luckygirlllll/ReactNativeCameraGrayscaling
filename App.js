/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import Slider from '@react-native-community/slider';

class App extends React.Component {
  state = {
    imageSource: null,
    grayScaleLevel: 0.7,
  };

  takePicture = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      this.setState({imageSource: image.path});
    });
  };

  render() {
    const {imageSource, grayScaleLevel} = this.state;
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            contentContainerStyle={styles.scrollView}>
            <TouchableHighlight
              style={styles.buttonStyle}
              onPress={this.takePicture}>
              <Text style={styles.textStyle}>Take a picture</Text>
            </TouchableHighlight>
            {imageSource != null && (
              <>
                <Image style={styles.image} source={{uri: imageSource}} />
                <Grayscale amount={grayScaleLevel}>
                  <Image style={styles.image} source={{uri: imageSource}} />
                </Grayscale>
                <Text style={styles.text}>Change grayscale level</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="grey"
                  maximumTrackTintColor="#000000"
                  onValueChange={(value) =>
                    this.setState({grayScaleLevel: value})
                  }
                  value={grayScaleLevel}
                />
              </>
            )}
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'blue',
    width: 200,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  textStyle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 40,
  },
  slider: {
    width: 200,
    height: 40,
  },
  text: {
    marginTop: 20,
  },
});

export default App;
