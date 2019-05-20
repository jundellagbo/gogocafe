import React from "react"
import {Container, Content, Icon, Text, ListItem, Left, Body} from "native-base"
import {View, FlatList} from "react-native"
import Nav from "./../components/Nav"
import axios from "axios"
import { server, timeout } from "./../env"
import Loader from "./../components/Loader"
import Error from "./../components/Error"
import FastImage from "react-native-fast-image"
class Menu extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            loading: true,
            error: false,
            menus: []
        }
        this.mounted = false
    }

    fetchMenu = async () => {
        this.setState({ loading: true })
        await axios.get( server + "categories/parent/api", timeout)
        .then(response => {
            if( this.mounted ) {
                this.setState({ loading: false, menus: response.data, error: false })
            }
        })
        .catch(error => {
            if( this.mounted ) {
                this.setState({ loading: false, error: true })
            }
        })
    }

    componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            this.fetchMenu()
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        
        const { loading, error, menus} = this.state

        return (
            <Container>
                <Nav 
                title={"Menu"}
                left={
                    { text: "Home", onPress: () => this.props.navigation.navigate("Home") }
                }
                right={
                    { icon: "sync", onPress: () => this.fetchMenu() }
                }
                />
                {
                    loading ? (<Loader text={"Loading Menu"} />) :
                    (
                        !error ? (
                            <Content padder>
                             {
                                menus.length ? (
                                    <FlatList
                                    removeClippedSubviews={false}
                                    initialNumToRender={5}
                                    initialListSize={5}
                                    maxToRenderPerBatch={10}
                                    windowSize={10}
                                    data={menus}
                                    keyExtractor={(item) => 'menu-list-' + item.term_id}
                                    renderItem={({ item }) => (
                                        <Menus dataSource={item} navigate={(category) => this.props.navigation.navigate("Products", { category })} />
                                    )}
                                />
                                ) : (<NoMenu/>)
                            }
                            </Content>
                        )
                        :
                        (
                            <Error text={"Please connect to the internet."} />
                        )
                    )
                }
            </Container>
        )
    }
}

const NoMenu = () => {
    <View style={style.center}>
        <Icon style={{ marginBottom: 15}} name={"cafe"} />
        <Text>There is no available menu.</Text>
    </View>
}

const Menus = (props) => (
    <View style={{ flex: 1 }}>
    <ListItem itemDivider style={{ marginBottom: 10 }}><Text>{props.dataSource.name}</Text></ListItem>
    {
        props.dataSource.children.length ? props.dataSource.children.map(( child ) => (
            <ListItem style={{ marginBottom: 10 }} thumbnail key={child.term_id} onPress={() => props.navigate(child)}>
                <Left>
                    <FastImage 
                    style={{ width: 60, height: 60 }}
                    source={{ 
                        uri: child.description != "" ? 
                        child.description : 
                        "https://ggc.indigroup.biz/wp-content/uploads/photo-gallery/imported_from_media_libray/cha-han-2.png?bwg=1543927134",
                        priority: FastImage.priority.high
                    }} 
                    />
                </Left>
                <Body>
                    <Text>{child.name}</Text>
                </Body>
            </ListItem>
        )): (
            <ListItem style={{ marginBottom: 10 }} thumbnail key={props.dataSource.term_id} onPress={() => props.navigate( props.dataSource )}>
                <Left>
                    <FastImage 
                    style={{ width: 60, height: 60 }}
                    source={{ 
                        uri: child.description != "" ? 
                        child.description : 
                        "https://ggc.indigroup.biz/wp-content/uploads/photo-gallery/imported_from_media_libray/cha-han-2.png?bwg=1543927134",
                        priority: FastImage.priority.high
                    }} 
                    />
                </Left>
                <Body>
                    <Text>{props.dataSource.name}</Text>
                </Body>
            </ListItem>
        )
    }
    </View>
)

const style = {
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
}
export default Menu