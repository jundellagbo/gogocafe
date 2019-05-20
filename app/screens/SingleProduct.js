import React from "react"
import {Content, Text, Container, Icon} from "native-base"
import {Image, View, AsyncStorage, Alert, TouchableOpacity, WebView} from "react-native"
import Nav from "./../components/Nav"
import {NavigationActions} from "react-navigation"
class SingleProduct extends React.Component {
    constructor( props ) {
        super( props )
        this.state = {
            showButton: true,
            product: this.props.navigation.state.params.product,
        }
        this.mounted = false
    }
    storeFavorites = async product => {
        try {
            const getFavorties = await AsyncStorage.getItem("favorites")
            const favorites = getFavorties ? JSON.parse(getFavorties) : [];
            const validate = favorites.every( ( val ) => val.id != product.id )
            if( validate ) {
                favorites.push(product)
                await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
                .then( response => {
                    const navigateAction = NavigationActions.setParams({
                        key: 'FavoritesKey',
                        params: { favorites: JSON.stringify(favorites) }
                    })
                    this.props.navigation.dispatch(navigateAction);
                    Alert.alert("Go Go Cafe", product.title + " has been added to favorites.")
                    this.setState({ showButton: false })
                })
                .catch( error => {
                    Alert.alert("Go Go Cafe", "Adding to favorites failed, please try again.")
                })
            } else {
                Alert.alert("Go Go Cafe", product.title + " has been added already.")
            }
        } catch( error ) {
            Alert.alert("Go Go Cafe", "Adding to favorites failed, please try again.")
        }
    }

    removeFavorites = async product => {
        const favorites = await AsyncStorage.getItem("favorites")
        const json = JSON.parse(favorites)
        const indexToRemove = json.findIndex(( row ) => row.id == product.id )
        json.splice(indexToRemove, 1)
        
        await AsyncStorage.setItem("favorites", JSON.stringify(json))
        .then( response => {
            const navigateAction = NavigationActions.setParams({
                key: 'FavoritesKey',
                params: { favorites: JSON.stringify(json) }
            })
            this.props.navigation.dispatch(navigateAction);
            Alert.alert("Go Go Cafe", product.title + " has been removed from favorites.")
            this.setState({ showButton: true })
        })
        .catch( error => {
            Alert.alert("Go Go Cafe", "Failed to remove from favorites.")
        })
    }
    async componentDidMount() {
        this.mounted = true
        const { product } = this.state
        const favorites = await AsyncStorage.getItem("favorites")
        if( favorites ) {
            const json = JSON.parse(favorites)
            const validate = json.every(( fav ) => product.id != fav.id )
            if( !validate ) {
                if( this.mounted ) {
                    this.setState({ showButton: false })
                }
            } else {
                if( this.mounted ) {
                    this.setState({ showButton: true })
                }
            }
        }
    }
    componentWillUnmount() {
        this.mounted = false
    }
    render() {
        const { product, showButton } = this.state
         return (
            <Container>
                <Nav 
                title={"Go Go Cafe"}
                left={
                    { icon: "arrow-back", onPress: () => this.props.navigation.goBack() }
                }
                right={
                    { text: "Favorites", onPress: () => this.props.navigation.navigate("Favorites") }
                }
                />
                <View style={{ flex: 1, padding: 15 }}>
                    <View style={{ flex: 1, position: "relative", zIndex: 999999 }}>
                    <Image source={{ uri: product.thumbnail == null ? "http://ggc.indigroup.biz/wp-content/uploads/photo-gallery/imported_from_media_libray/shio-ramen-3.jpg?bwg=1543927134" : product.thumbnail }} style={{ flex: 1 }} width={null} height={250} />
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 2}}>
                            <Text style={style.productname}>{product.title}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            {
                                showButton ? (
                                    <TouchableOpacity style={[style.pinTouch, { backgroundColor: "#d2d2d2" }]} onPress={() => this.storeFavorites(product)}>
                                        <Icon name={"heart"} style={style.pinIcon}/>
                                    </TouchableOpacity>
                                ) : (
                                    <TouchableOpacity style={style.pinTouch} onPress={() => this.removeFavorites(product)}>
                                        <Icon name={"heart"} style={style.pinIcon}/>
                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                    <Text style={style.productprice}>{product.price}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <WebView style={{ marginLeft: -5, backgroundColor: "transparent" }} source={{ html: product.description }}/>
                    </View>
                </View>
            </Container>
        )
    }
}
const style = {
    productname: {
        marginTop: 10, marginBottom: 5, fontSize: 20, color: "#FF9800", fontFamily: "Montserrat-Bold"
    },
    productprice: {
        marginTop: 5, marginBottom: 5, fontSize: 18, fontFamily: "Montserrat-Bold"
    },
    pinTouch: {
        alignSelf: "flex-end", 
        width: 40, 
        height: 40, 
        borderRadius: 50, 
        backgroundColor: "#FF9800",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginRight: 10
    },
    pinIcon: {
        color: "#ffffff", fontSize: 20
    }
}
export default SingleProduct