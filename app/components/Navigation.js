import React from "react"
import {Header, Left, Body, Right, Icon, Title} from "native-base"
import { TouchableWithoutFeedback } from "react-native"
import PropTypes from "prop-types"
const Navigation = ( props ) => {
    const { navigation, title, right_icon, event } = props
    return (
        <Header style={style.header}>
            <Left style={style.flex}>
                <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
                   <Icon style={style.black} name="menu" />
                 </TouchableWithoutFeedback>
            </Left>
            <Body style={style.flex}>
                <Title style={[style.black, {alignSelf: "center"}]} noted>{title}</Title>
            </Body>
            <Right style={style.flex}>
                <TouchableWithoutFeedback transparent onPress={event}>
                   <Icon style={style.black} name={right_icon} />
                 </TouchableWithoutFeedback>
            </Right>
        </Header>
    )
}
const style = {
    header: {
        backgroundColor: "#ffffff",
        paddingLeft: 15,
        paddingRight: 15,
        zIndex: 999999999,
        position: "relative"
    },
    flex: {
        flex: 1
    },
    black: {
        color: "#000000"
    },
}
Navigation.propTypes = {
    navigation: PropTypes.any,
    title: PropTypes.string,
    right_icon: PropTypes.string,
    event: PropTypes.func
}
export default Navigation