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

    const onViewRef = React.useRef(({viewableItems}) => {
        // console.log(viewableItems.length != 0?viewableItems[0].index: "noview")
        // Use viewable items in state or as intended
        setActive(viewableItems[0].index)
    })
    const viewConfigRef = React.useRef({ viewAreaCoveragePercentThreshold: 50 })


    useEffect(() => {
        // console.log(active)
        if (props.adds.length === 0) return
        myRef.current.scrollToIndex({
            animated: true,
            index: active,
        });
    }, [active])


    useEffect(() => {
        if (props.adds.length === 0) return

        const timer = setTimeout(() => {
            const nextIndex = (active + 1) % images.length
            setActive(nextIndex);
        }, 5000);
        return () => clearTimeout(timer);
    }, [active])


    const _renderItem = (item, index) => (
        <BannerComponent item={item} />
    );

    // const scrollEnd = (e) => {
    //     console.log("Visible items are", e.index);

    // }


    return (
        <>
            <FlatList
                ref={myRef}
                data={props.adds}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
                onViewableItemsChanged={onViewRef.current}
                // onViewableItemsChanged={scrollEnd}
                viewabilityConfig={viewConfigRef.current}
                // onScroll={scrollEnd}
                pagingEnabled
                // ListFooterComponent={this._listFooter}
                // ListHeaderComponent={this._listHeader}
                renderItem={_renderItem}
            />
            <View style={{ position: "absolute", bottom: 10, width: "100%", }}>
                <Dots
                    activeColor={colors.white}
                    passiveColor={colors.softWhite}
                    length={props.adds.length}
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
