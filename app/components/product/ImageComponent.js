import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../config/vars";
import MiniHeader from "../MiniHeader";
import { Image } from 'react-native-elements';

const { width, height } = Dimensions.get('window')

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.image && this.props.image[0].image,
      roller: 0
    };
  }

  rollImage = (dir) => {
    // console.log("ldsflkkads");
    const { roller } = this.state
    const { image } = this.props
    let index = 0
    if (dir == "right") {
      index = (roller + 1) % (image.length)
    } else {
      if (roller == 0) {
        index = (image.length - 1) % (image.length)
      } else {
        index = (roller - 1) % (image.length)
      }
    }
    this.setState({
      image: image[index].image,
      roller: index
    })
  }

  render() {
    console.log("this.props.hraj");
    console.log(this.props.hraj);
    return (
      <View style={styles.container}>

        {this.props.image && this.props.image.length > 1 && this.props.hraj && (
          <>
            <TouchableOpacity onPress={() => this.rollImage("left")} style={[styles.roller, { left: 20 }]}>
              <Icon name="chevron-left" color={colors.mainColor} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.rollImage("right")} style={[styles.roller, { right: 20 }]}>
              <Icon name="chevron-right" color={colors.mainColor} size={30} />
            </TouchableOpacity>
          </>
        )}

        <View style={styles.header}>
          <MiniHeader title={""} backgroundColor={this.props.hraj ? "" : colors.white} navigation={this.props.navigation} />
        </View>
        {this.props.hraj ? (
          <Image
            PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
            source={{ uri: this.state.image }}
            style={styles.image}
          />
        ) : (
          <Image
            PlaceholderContent={<ActivityIndicator color={colors.mainColor} size="small" />}
            source={{ uri: this.props.image }}
            style={styles.image}
          />
        )}
        {!this.props.hraj && (
          <TouchableOpacity onPress={this.props.setFav} style={[styles.favCont]}>
            <Icon name={this.props.fav ? "heart" : "heart-outline"} size={30} color={colors.danger} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: (height * 55) / 100,
    backgroundColor: colors.white
  },
  image: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    // zIndex: 11111111
  },
  favCont: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: colors.whiteF7,
    padding: 5,
    borderRadius: 60,
    elevation: 5,
    // left: 0,
    // zIndex: 11111111
  },
  roller: {
    position: "absolute",
    backgroundColor: colors.white,
    elevation: 5,
    zIndex: 11,
    // alignSelf: "center",
    top: "50%",
    padding: 5,
    borderRadius: 50,
  }
})
