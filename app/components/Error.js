import React from "react"
import {Text, Icon} from "native-base"
import {View} from "react-native"
const Error = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Icon style={{ marginBottom: 15}} name={"cafe"} />
        <Text style={{ fontSize: 12 }}>{props.text}</Text>
    </View>
)
export default Error