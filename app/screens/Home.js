import React from "react"
import {Content, Text, Container} from "native-base"
import {ImageBackground, View, ScrollView, TouchableOpacity} from "react-native"
import Nav from "./../components/Nav"
import FastImage from "react-native-fast-image"
class Home extends React.Component {
    render() {
        const bestSellers = this.props.navigation.state.params.bestSeller
        return (
            <Container>
                <Nav
                title={"Go Go Cafe"}
                left={
                    { text: "Menu", onPress: () => this.props.navigation.navigate("Menu")}
                }
                right={
                    { text: "Favorites", onPress: () => this.props.navigation.navigate("Favorites") }
                }
                />
                <Content padder>

                    <ImageOverlayNoClick 
                    src={require("./../img/atf.png")} 
                    title={"Japanese Restaurant and Cafe"} />

                    {
                        bestSellers.length == 0 ? (
                            <NoBestSeller onPress={() => this.props.navigation.navigate("Loading")}/>
                        ) : (
                            <View style={{ paddingBottom: 15 }}>
                                <View style={{ paddingBottom: 15 }}>
                                    <Text>Our Best Sellers</Text>
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <BestSeller product={(product) => this.props.navigation.navigate("SingleProduct", { product })} dataSource={bestSellers}/>
                                </ScrollView>
                            </View>
                        )
                    }

                    <ImageOverlay 
                    src={require("./../img/go-marita.png")} 
                    title={"Get a Souvenir"} 
                    onPress={() => this.props.navigation.navigate("Products", { category: { term_id: 31, name: "Souvenir" } })}
                    />

                    <ImageOverlay 
                    src={require("./../img/gogomenu.png")} 
                    title={"Check our Menu"} 
                    onPress={() => this.props.navigation.navigate("Menu")}
                    />

                    <ImageOverlay 
                    src={require("./../img/contact.png")} 
                    title={"Our Location"}
                    style={{ marginBottom: 0 }} 
                    onPress={() => this.props.navigation.navigate("Location")}
                    />

                </Content>
            </Container>
        )
    }
}

const NoBestSeller = (props) =>
(
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ marginBottom: 15 }}>Please connect to the internet.</Text>
        <TouchableOpacity style={[style.center, style.buttonMenu]} onPress={props.onPress}>
            <Text style={{ fontSize: 14}}>Reload App</Text>
        </TouchableOpacity>
    </View>
)

const BestSeller = (props) => props.dataSource.length != 0 ? props.dataSource.map(( row ) => 
<View key={row.id} style={[style.bestsellerItem, style.center]}>
    <TouchableOpacity onPress={() => props.product(row)}>
        <FastImage 
        source={{ 
            uri: row.thumbnail != null ? 
            row.thumbnail : "http://ggc.indigroup.biz/wp-content/uploads/photo-gallery/imported_from_media_libray/shio-ramen-3.jpg?bwg=1543927134", 
            priority: FastImage.priority.high
        }}
        style={style.bestsellerImg}/>
        <Text numberOfLines={1} style={style.bestseller}>{row.title}</Text>
    </TouchableOpacity>
</View>
) : (<NoBestSeller onPress={() => this.props.navigation.navigate("Menu")}/>)

const ImageOverlay = (props) => (
    <TouchableOpacity style={[{ marginBottom: 15 }, props.style]} onPress={props.onPress}>
        <ImageBackground
        style={style.imageBg}
        source={props.src}>
        <View style={style.overlay}>
            <Text style={{ color: "#ffffff" }}>{props.title}</Text>
        </View>
        </ImageBackground>
    </TouchableOpacity>
)

const ImageOverlayNoClick = (props) => (
    <ImageBackground
    style={[style.imageBg, { marginBottom: 15 }]}
    source={props.src}>
    <View style={style.overlay}>
        <Text style={{ color: "#ffffff" }}>{props.title}</Text>
    </View>
    </ImageBackground>
)

const style = {
    overlay: {
        position: "absolute", bottom: 5, left: 5, backgroundColor: "#000000",
        padding: 5,
    },
    imageBg: {
        flex: 1, height: 200, position: "relative"
    }
    ,
    bestsellerItem: {
        marginRight: 15, width: 90
    },
    bestsellerImg: {
        width: 90, height: 60
    },
    bestseller: {
        fontSize: 12, marginTop: 8 
    },
    center: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    buttonMenu: {
        marginBottom: 15,
        padding: 5,
        borderWidth: 1,
        borderColor: "#5D4037"
    }
}
export default Home