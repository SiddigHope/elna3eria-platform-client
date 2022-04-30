import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddsList from '../components/home/showAdds/AddsList';
import { colors } from '../config/vars';


const data = [
    {
        id: "1",
        type: "image",
        file: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH5Q09fKQOrDsbGZ5jjuHlxTsLmVY2xsc-7A&usqp=CAU",
    },
    {
        id: "2",
        type: "video",
        file: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"
        // file: "https://www.youtube.com/watch?v=l9Ny3CrYYWk",
    },
    {
        id: "3",
        type: "image",
        file: "https://inteng-storage.s3.amazonaws.com/img/iea/lV6DYQWrwx/sizes/car-names_md.jpg",
    },
    {
        id: "4",
        type: "image",
        file: "https://blog.hubspot.com/hubfs/%5BAgency_Post%5D/Blog_Images/brand-names-different-countries.png",
    },
    // {
    //     id: "5",
    //     type: "video",
    //     file: "https://www.youtube.com/watch?v=9em32dDnTck",
    // }
]


export default class ShowAdds extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        this.getData()
    }

    getData = () => {
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <AddsList data={this.state.data} navigation={this.props.navigation} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.danger,
        justifyContent: 'center',
        alignItems: 'center'
    }
})