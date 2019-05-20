import React from "react"
import { Container, Content, List, ListItem, Left, Body, Thumbnail, Text, Icon } from "native-base"
import { View, TouchableWithoutFeedback } from "react-native"
class NavDrawer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            error: false
        }
    }
    componentDidMount() {
        this.setState({ dataSource: this.props.screenProps.dataSource })
    }
    componentDidUpdate(prevProps) {
        if( prevProps.screenProps != this.props.screenProps ) {
            this.setState({ dataSource: this.props.screenProps.dataSource })
        }
    }
    navigate = ( id, name, products ) => {
        const { navigation } = this.props
        navigation.closeDrawer()
        navigation.navigate("Products", { id, name, products })
    }
    home = () => {
        const { navigation } = this.props
        navigation.navigate("Intro")
        navigation.closeDrawer()
    }
    render() {
        const { dataSource } = this.state
        const { navigation } = this.props

        return (
            <Container padder keyboardShouldPersistTaps={'always'}>
                <Content>
                    <View style={{ position: "absolute", right: 15, top: 10 }}>
                        <TouchableWithoutFeedback onPress={() => navigation.closeDrawer() }>
                            <Icon name={"arrow-back"} />
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={{ marginTop: 10, marginBottom: 10, flex: 1 }}>
                        <TouchableWithoutFeedback onPress={this.home}>
                            <Thumbnail style={{ marginBottom: 10, marginLeft: "auto", marginRight: "auto", width: 80, height: 80 }} source={require("./../img/gogologo.png")} square />
                        </TouchableWithoutFeedback>
                        <Text style={{ color: "#8BC34A", textAlign: "center", fontFamily: "Montserrat-Bold" }}>Go Go Cafe</Text>
                        <Text style={{ textAlign: "center" }} noted>Cafe and Restaurant</Text>
                    </View>
                    <List>
                        {
                            dataSource.length > 0 ? dataSource.map(( row ) => {
                                const img = row.description == "" ? "http://ggc.indigroup.biz/wp-content/uploads/2018/12/gogocafe-logo-300x300.png" : row.description
                                return (
                                    <ListItem style={{ paddingBottom: 7, paddingTop: 7 }} key={row.term_id} onPress={() => this.navigate(row.term_id, row.name, row.products)} avatar>
                                        <Left>
                                            <Thumbnail style={{ marginTop: -13 }} source={{ uri: img }} />
                                        </Left>
                                        <Body>
                                            <Text>{row.name}</Text>
                                        </Body>
                                    </ListItem>
                                )
                            }) : null
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}

export default NavDrawer