import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import AddMediaComponent from './AddMediaComponent';

export default class MediaContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elapsedTime: 0
        };
    }


    startProgress = () => {
        console.log("from root function")
        console.log(this.progressCalc())
    }

    progressCalc = () => {
        const { elapsedTime } = this.state
        const maxTimeInSeconds = 30
        const intervalId = setInterval(() => {
            this.setState((previousState) => {
                return {
                    elapsedTime: previousState.elapsedTime + 1
                }
            });
        }, 1000);
        // return () => clearInterval(intervalId);
        console.log("from child function")
        console.log((elapsedTime % maxTimeInSeconds) / maxTimeInSeconds)
        return (elapsedTime % maxTimeInSeconds) / maxTimeInSeconds;
    };



    _renderItem = (item, index) => (
        <AddMediaComponent
            startCount={this.props.startCount}
            openModal={this.props.openModal}
            item={item}
            index={index}
            navigation={this.props.navigation}
        />
    );

    _listFooter = () => <View style={{ height: 20 }} />;

    _listHeader = () => <View style={{ height: 20 }} />;

    scrollEnd = ({ viewableItems, changed }) => {
        // console.log("Visible items are", viewableItems[0].index);
        this.props.setActive(viewableItems[0].index)
        // console.log("Changed in this iteration", changed);
    }

    render() {
        // console.log("this.props.data")
        // console.log(this.props.data)
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={(item, index) => index.toString()}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                    onViewableItemsChanged={this.scrollEnd}
                    // onScroll={this.scrollEnd}
                    pagingEnabled
                    // ListFooterComponent={this._listFooter}
                    // ListHeaderComponent={this._listHeader}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    }
})
