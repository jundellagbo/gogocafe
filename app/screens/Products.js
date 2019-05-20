import React from "react"
import {Container, Text, ListItem, Left, Body, Right} from "native-base"
import {FlatList, View} from "react-native"
import Nav from "./../components/Nav"
import Loader from "./../components/Loader"
import Error from "./../components/Error" 
import axios from "axios"
import {server, timeout} from "./../env"
import FastImage from "react-native-fast-image"
class Products extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: props.navigation.state.params.category,
            loading: true,
            error: false,
            products: []
        }
        this.mounted = true
    }
    fetchProduct = async () => {
        this.setState({ loading: true })
        await axios.get(server + "product/category/api?cat_id=" + this.state.category.term_id, timeout)
        .then( response => {
            if( this.mounted ) {
                this.setState({ loading: false, products: response.data })
            }
        })
        .catch( error => {
            if( this.mounted ) {
                this.setState({ loading: false, error: true })
            }
        })
    }
    componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            this.fetchProduct()
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    render() {
        const {category, loading, error, products} = this.state
         return (
            <Container>
                <Nav 
                title={category.name}
                left={
                    { icon: "arrow-back", onPress: () => this.props.navigation.navigate("Menu") }
                }
                right={
                    { icon: "sync", onPress: () => this.fetchProduct() }
                }
                />
                {
                    loading ? (<Loader text={"Loading Products."} />) :
                    (
                        !error ?
                        (
                            <View style={{ flex: 1 }}>
                                {
                                    products.length ? (
                                    <FlatList
                                        removeClippedSubviews={false}
                                        initialNumToRender={5}
                                        initialListSize={5}
                                        maxToRenderPerBatch={10}
                                        windowSize={10}
                                        data={products}
                                        keyExtractor={(item) => 'products-list-' + item.id}
                                        renderItem={({ item }) => (
                                            <RenderItem item={item} onPress={(product) => this.props.navigation.navigate("SingleProduct", { product })} />
                                        )}
                                    />
                                    ) : (<Error text={"There is no product available."} />)
                                }
                            </View>
                        ) :
                        (<Error text={"Please connect to the internet."} />)
                    )
                }
            </Container>
        )
    }
}

const RenderItem = (props) => (
    <ListItem thumbnail key={props.item} onPress={() => props.onPress( props.item )}>
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

export default Products