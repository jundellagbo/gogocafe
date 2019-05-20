import React from "react"
import {Header, Left, Body, Right, Text, Icon} from "native-base"
import {TouchableOpacity} from "react-native"
import PropTypes from "prop-types"
const Nav = (props) => {
    const { left, right, title } = props
    return (
        <Header style={style.head_}>
            <Left style={{ flex: 1 }}>
            {
                left ?
                (
                    <TouchableOpacity onPress={left.onPress}>
                        { left.text ? (<Text style={style.nav}>{left.text}</Text>) : (<Icon name={left.icon} />) }
                    </TouchableOpacity>
                ) : null
            }
            </Left>
            <Body style={{ flex: 2, justifyContent: "center", alignItems: "center" }}>
                <Text style={{ fontSize: 18 }}>{title}</Text>
            </Body>
            <Right style={{ flex: 1 }}>
                {
                    right ?
                    (
                        <TouchableOpacity onPress={right.onPress}>
                            { right.text ? (<Text style={style.nav}>{right.text}</Text>) : (<Icon name={right.icon} />) }
                        </TouchableOpacity>
                    ) : null
                }
            </Right>
        </Header>
    )
}
const style = {
    nav: {
        fontSize: 14
    },
    head_: {
        borderBottomWidth: 0.3, borderBottomColor: "#d4d4d4", backgroundColor: "transparent", elevation: 0, paddingLeft: 15, paddingRight: 15
    }
}
Nav.propTypes = {
    left: PropTypes.object,
    title: PropTypes.string,
    right: PropTypes.object
}
export default Nav