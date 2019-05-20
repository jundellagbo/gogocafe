import React from "react"
import {Spinner, Text} from "native-base"
import {View} from "react-native"
const Loader = (props) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <Spinner  color={"#FF9800"} />
        <Text style={{ fontSize: 12 }}>{props.text}</Text>
    </View>
)
export default Loader