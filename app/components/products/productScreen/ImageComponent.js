import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, ImageBackground, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors, fonts } from '../../../config/vars';
import MiniHeader from "../../MiniHeader";
import { AssetsSelector } from 'expo-images-picker'

const { width, height } = Dimensions.get('window')

const widgetSettings = {
  getImageMetaData: false,
  initialLoad: 100,
  assetsType: ["photo"],
  minSelection: 1,
  maxSelection: 5,
  portraitCols: 4,
  landscapeCols: 5,
}

const widgetErrors = {
  // errorTextColor: polar_text_2,
  errorMessages: {
    hasErrorWithPermissions:
      "يجب اعطاء التطبيق الاذن للوصول للملفات",
    hasErrorWithLoading: "حدث خطأ ما اعد المحاولة مرة اخرى",
    hasErrorWithResizing: "حدث خطأ ما اعد المحاولة مرة اخرى",
    hasNoAssets: "لا توجد ملفات",
  },
}

const widgetStyles = {
  margin: 2,
  bgColor: colors.whiteF7,
  spinnerColor: colors.mainColor,
  widgetWidth: 99,
  screenStyle: {
    borderRadius: 5,
    overflow: "hidden",
  },
  widgetStyle: {
    margin: 10
  },
  videoIcon: {
    Component: Icon,
    iconName: 'ios-videocam',
    color: colors.grey,
    size: 20,
  },
  selectedIcon: {
    Component: Icon,
    iconName: 'check-circle',
    color: 'white',
    bg: colors.blackTransparent,
    size: 26,
  },
}

const widgetResize = {
  width: 512,
  compress: 0.7,
  base64: false,
  saveTo: "jpg",
}

export default class ImageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: { uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80" },
      images: [],
      imagesModal: false,
      roller: 0,
    };
    this.onSuccess = this.onSuccess.bind(this)
    this.widgetNavigator = {
      Texts: {
        finish: 'تم',
        back: 'رجوع',
        selected: '',
      },
      midTextColor: styles.selectedStyle,
      selectedTextStyle: styles.selectedStyle,
      buttonTextStyle: styles.buttonTextStyle,
      buttonStyle: styles.buttonStyle,
      onBack: () => this.setState({ imagesModal: false }),
      onSuccess: (data) => this.onSuccess(data),
    }
  }

  componentDidMount() {
    if (this.props.screen == "edit") {
      this.getData()
    }
  }

  getData = () => {
    this.setState({
      image: { uri: this.props.item.images[0].image },
      images: this.props.item.images
    })
  }

  onSuccess(data) {
    // console.log(data.length);
    const images = []
    data.forEach(result => {
      let localUri = result.uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);

      let type = match ? `image/${match[1]}` : `image`;

      this.setState({ image: result });
      const image = {
        uri: localUri,
        name: filename,
        type,
      }
      images.push(image)
    });
    this.setState({
      images,
      imagesModal: false
    })
    this.props.onChange(images)

  }


  rollImage = (dir) => {
    console.log("ldsflkkads");
    const { roller, images } = this.state
    let index = 0
    if (dir == "right") {
      index = (roller + 1) % (images.length)
    } else {
      if(roller == 0){
        index = (images.length - 1) % (images.length)
      }else{
        index = (roller - 1) % (images.length)
      }
    }
    if(this.props.screen == "edit"){
      this.setState({
        image: {uri: images[index].image},
        roller: index
      })
    }else{
      this.setState({
        image: images[index],
        roller: index
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.images.length > 1 && (
          <>
            <TouchableOpacity onPress={() => this.rollImage("left")} style={[styles.roller, { left: 20 }]}>
              <Icon name="chevron-left" color={colors.mainColor} size={30} />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.rollImage("right")} style={[styles.roller, { right: 20 }]}>
              <Icon name="chevron-right" color={colors.mainColor} size={30} />
            </TouchableOpacity>
          </>
        )}

        <Modal
          transparent={true}
          onBackdropPress={() => this.setState({ imagesModal: false })}
          onSwipeComplete={() => this.setState({ imagesModal: false })}
          onRequestClose={() => this.setState({ imagesModal: false })}
          visible={this.state.imagesModal}
          animationType="fade">
          <View style={styles.modalContainer}>
            <View style={styles.modal}>
              <AssetsSelector
                Settings={widgetSettings}
                Errors={widgetErrors}
                Styles={widgetStyles}
                Resize={widgetResize}       // optional
                Navigator={this.widgetNavigator} // optional
              />
            </View>
          </View>
        </Modal>


        <ImageBackground source={{ uri: this.state.image.uri }} style={styles.image}>
          <View style={styles.header}>
            <MiniHeader title={""} navigation={this.props.navigation} />
          </View>
          {this.props.editable && (
            <TouchableOpacity onPress={() => this.setState({ imagesModal: true })} style={styles.iconContainer}>
              <Icon name="image-plus" size={30} color={colors.mainColor} />
            </TouchableOpacity>
          )}
          {/* <Text style={styles.discountBtnText}> {"يمكنك اختبار اكثر من صورة للمنتج"} </Text> */}

        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 20,
    right: 0,
    left: 0,
    // zIndex: 11111111
  },
  container: {
    width,
    height: (height * 50) / 100,
    // backgroundColor: 'red'
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.white
  },
  discountBtnText: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.grey
  },
  modalContainer: {
    height,
    width,
    justifyContent: "center",
    backgroundColor: colors.blackTransparent
  },
  modal: {
    height: "100%",
    backgroundColor: colors.whiteF7,
    elevation: 10,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 20,
  },
  buttonTextStyle: {
    fontFamily: fonts.tajawalR,
    fontSize: 14,
    color: colors.white,
  },
  buttonStyle: {
    backgroundColor: colors.blueLight,
    borderRadius: 10,
  },
  selectedStyle: {
    fontFamily: fonts.tajawalR
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
