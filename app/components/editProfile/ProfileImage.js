import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import { colors } from '../../config/vars';
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { elevations } from '../../config/elevations';
import * as ImagePicker from 'expo-image-picker';

export default class ProfileImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: require("../../../assets/images/avatar.png")
        };
    }

    componentDidMount() {
        if (this.props.image) {
            this.getData()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.image != this.state.image) {
            this.setState({
                image: {uri: nextProps.image},
            })
        }
    }

    getData = () => {
        this.setState({
            image: { uri: this.props.image }
        })
    }

    _imagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        let localUri = result.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);

        let type = match ? `image/${match[1]}` : `image`;

        if (!result.cancelled) {
            this.setState({ image: result });
            const image = {
                uri: localUri,
                name: filename,
                type,
            }
            // console.log(image)
            this.props.onChange(image)
        }
    }

    render() {
        return (
            <View style={[styles.container, elevations[5]]}>
                <Image source={this.state.image} style={styles.image} />
                <TouchableOpacity onPress={this._imagePicker} style={[styles.btn, elevations[5]]} >
                    <Icon name='image-plus' size={25} color={colors.mainColor} />
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        height: 150,
        width: 150,
        borderRadius: 100,
        backgroundColor: colors.white,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 100,
    },
    btn: {
        position: "absolute",
        // bottom: 0,
        // right: 0,
        padding: 5,
        borderRadius: 30,
        backgroundColor: colors.white,
        elevation: 5,
    }
})