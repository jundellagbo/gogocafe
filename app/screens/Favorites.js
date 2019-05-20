import React from "react"
import {Container, Text, ListItem, Left, Body, Right} from "native-base"
import Nav from "./../components/Nav"
import {FlatList} from "react-native"
import Error from "./../components/Error"
import FastImage from "react-native-fast-image"
class Favorites extends React.Component {
    constructor( props ) {
        super( props ) 
        this.state = {
            favorites: []
        }
        this.mounted = false
    }
    componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            const {favorites} = this.props.navigation.state.params
            const getFavorites = favorites === null ? [] : JSON.parse(favorites)
            this.setState({ favorites: getFavorites })
        }
    }
    componentDidUpdate(props) {
        if(props.navigation.state.params != this.props.navigation.state.params) {
            const { favorites } = this.props.navigation.state.params
            const getFavorites = favorites === null ? [] : JSON.parse(favorites)
            this.setState({ favorites: getFavorites })
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    favoption = (item, index) => {
        this.props.navigation.navigate("SingleProduct", { product: item, index })
    }
    render() {
        const { favorites } = this.state
        return (
            <Container>
                <Nav 
                title={"My Favorites"}
                left={
                    { text: "Menu", onPress: () => this.props.navigation.navigate("Menu") }
                }
                right={
                    { text: "Visit Us", onPress: () => this.props.navigation.navigate("Location") }
                }
                />
                {
                    favorites.length ? (
                        <FlatList
                            removeClippedSubviews={false}
                            initialNumToRender={5}
                            initialListSize={5}
                            maxToRenderPerBatch={10}
                            windowSize={10}
                            data={favorites}
                            keyExtractor={(item) => 'favorites-list-' + item.id}
                            renderItem={({ item, index }) => (
                                <RenderItem item={item} onPress={() => this.favoption(item, index)} />
                            )}
                        />
                    ) : (<Error text={"You have no favorites for now."} />)
                }
            </Container>
        )
    }
}
const RenderItem = (props) => (
    <ListItem thumbnail key={props.item} onPress={props.onPress}>
        <Left>
            <FastImage 
            style={{ width: 60, height: 60 }}
            source={{ 
                uri: props.item.thumbnail != null ? 
                props.item.thumbnail : "http://ggc.indigroup.biz/wp-content/uploads/photo-gallery/imported_from_media_libray/shio-ramen-3.jpg?bwg=1543927134", 
                priority: FastImage.priority.high
            }} />
        </Left>
        <Body>
            <Text>{props.item.title}</Text>
            <Text note numberOfLines={1}>{props.item.description}</Text>
        </Body>
        <Right>
            <Text style={{ color: "#FF9800" }}>&#8369; {props.item.price != null ? props.item.price.split(".")[0] : 0 }</Text>
        </Right>
    </ListItem>
)
export default Favorites