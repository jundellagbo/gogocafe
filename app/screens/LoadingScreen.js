import React from "react"
import {View, Image, AsyncStorage} from "react-native"
import axios from "axios"
import {server, timeout} from "./../env"
import {NavigationActions} from "react-navigation"
class LoadingScreen extends React.Component {

    constructor( props ) {
        super( props )
        this.mounted = false
    }

    setFavorites = async () => {
        const favorites = await AsyncStorage.getItem("favorites")
        const navigateAction = NavigationActions.setParams({
            key: "FavoritesKey",
            params: { favorites }
        })
        this.props.navigation.dispatch(navigateAction);
    }

    fetchBestSeller = async () => {
        await axios.get(server + "product/category/api?cat_id=" + 24, timeout)
        .then(response => {
            if( this.mounted ) {
                this.setFavorites()
                this.props.navigation.navigate("Home", { bestSeller: response.data })
            }
        })
        .catch(error => {
            if( this.mounted ) {
                this.setFavorites()
                this.props.navigation.navigate("Home", { bestSeller: [] })
            }
        })
    }

    async componentDidMount() {
        this.mounted = true
        if( this.mounted ) {
            this.fetchBestSeller()
        }
    }

    componentWillUnmount() {
        this.mounted = false
    }

    render() {
        return (
            <View style={style.bg}>
                <Image style={style.img} source={ require("./../img/gogologo.png") }/>
            </View>
        )
    }
}
const style = {
    bg: {
        flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fce6c9"
    },
    img: {
        width: 120, height: 120, marginBottom: 10
    },
    text: {
        fontSize: 14, fontFamily: "Montserrat", color: "#222222"
    }
}
export default LoadingScreen