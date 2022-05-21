import React, { Component } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../config/vars';
// import { colors } from '../../config/vars';
import { getHrajProductComments } from '../../../config/data';
import UserClass from '../../../config/authHandler';
import CommentComponent from './CommentComponent';
import CommentForm from './CommentForm';
import { submitHrajComment } from '../../../config/apis/posts';

export default class CommentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            user: [],
            loading: false
        };
    }

    componentDidMount() {
        this.getComments()
        this.getUser()
    }

    getUser = async () => {
        this.setState({
            user: await UserClass.getUser()
        })
    }

    getComments = async () => {
        this.setState({
            comments: await getHrajProductComments(this.props.productId)
        });
    }

    _itemSeparator = () => (
        <View style={{ height: 10 }} />
    )

    _listHeader = () => (
        <View style={styles.labelContainer}>
            <Text style={styles.label}> {"التعليقات"} </Text>
        </View>
    )

    submitForm = async (comment) => {
        const data = {
            hraj_product_id: this.props.productId,
            comment,
        }
        const submitted = await submitHrajComment(data);
        if (submitted) {
            this.getComments()
        }
        this.setState({
            loading: false
        })
    }

    _listFooter = () => (
        <CommentForm
            setLoading={() => this.setState({ loading: true })}
            loading={this.state.loading}
            submitForm={this.submitForm}
        />
    )

    _renderItem = (item, index) => (
        <CommentComponent user={this.state.user} item={item.item} index={index} />
    )


    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.comments}
                    keyExtractor={(item, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._listHeader}
                    style={{ width: "100%" }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    ListFooterComponent={this._listFooter}
                    ItemSeparatorComponent={this._itemSeparator}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        width: "100%",
        alignItems: 'center',
    },
    labelContainer: {
        // backgroundColor: "red",
        padding: 20,
        borderColor: colors.borderColor,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        marginBottom: 20,
    },
    label: {
        fontFamily: fonts.tajawalB,
        fontSize: 16,
        color: colors.ebony
    }
})