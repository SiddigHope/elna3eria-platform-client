import React, { useState, useEffect, useRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import BannerComponent from './BannerComponent';
import Dots from 'react-native-dots-pagination';
import { colors } from '../../../config/vars';

const images = [
    {
        id: 1,
        image: require("./../../../../assets/images/woman-holding-various-shopping-bags-copy-space.jpg"),
    },
    {
        id: 2,
        image: require("./../../../../assets/images/publicity.jpg"),
    },
    {
        id: 3,
        image: require("./../../../../assets/images/smiling-woman-writing-notes-tablet-digital-device.jpg"),
    },
]
export default function BannerList(props) {
    const [active, setActive] = useState(0)
    const myRef = useRef(null);
    
    useEffect(() => {
        myRef.current.scrollToIndex({
            animated: true,
            index: active,
        });
    }, [active])


    useEffect(() => {
        const timer = setTimeout(() => {
            // Change data.length to ads.length here
            const nextIndex = (active + 1) % images.length
            setActive(nextIndex);
            // console.log("the change happen")
            // console.log(nextIndex)
            // myRef.current.scrollToIndex({
            //     animated: true,
            //     index: active,
            // });
        }, 5000);
        return () => clearTimeout(timer);
    }, [active])


    const _renderItem = (item, index) => (
        <BannerComponent item={item} />
    );

    const scrollEnd = ({ viewableItems, changed }) => {
        console.log("Visible items are", viewableItems[0].index);
        setActive(viewableItems[0].index)
        console.log("Changed in this iteration", changed);
    }

    return (
        <>
            <FlatList
                ref={myRef}
                data={images}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                // onViewableItemsChanged={scrollEnd}
                // onScroll={this.scrollEnd}
                pagingEnabled
                // ListFooterComponent={this._listFooter}
                // ListHeaderComponent={this._listHeader}
                renderItem={_renderItem}
            />
            <View style={{ position: "absolute", bottom: 10, width: "100%", }}>
                <Dots
                    activeColor={colors.white}
                    passiveColor={colors.softWhite}
                    length={images.length}
                    active={active}
                    activeDotHeight={10}
                    activeDotWidth={15}
                    passiveDotHeight={10}
                    passiveDotWidth={10}
                    marginHorizontal={5}
                />
            </View>
        </>
    );
}
