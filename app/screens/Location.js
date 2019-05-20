import React from "react"
import {View, StyleSheet, Image, Dimensions, Alert, PermissionsAndroid} from "react-native"
import MapView, { Marker } from "react-native-maps"
import {Container, Icon} from "native-base"
import Nav from "./../components/Nav"

const {width, height} = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class Location extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gogoLocation: {
                latitude: 10.343,
                longitude: 123.921,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            region: {
                latitude: 10.343,
                longitude: 123.921,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            mapping: {
                latitude: 10.343,
                longitude: 123.921,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            },
            ready: false,
            mylocation: false
        }
    }

    async componentDidMount() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                    title: "",
                    message:
                    'Go Go Cafe requires to turn on your location'
                }
            )

            if( granted === PermissionsAndroid.RESULTS.GRANTED) {
                navigator.geolocation.getCurrentPosition(( position ) => {
                    this.setState({
                        ready: true,
                        mapping: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        }
                    })
                }, error => {}, { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000, distanceFilter: 1 },)

                this.watchId = navigator.geolocation.watchPosition((position) => {
                    this.setState({
                        mylocation: true,
                        region: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA
                        }
                    })
                }, error => {},
                    { enableHighAccuracy: true, timeout: 20000, maximumAge: 10000, distanceFilter: 1 },
                )
            } else {
                Alert.alert("Go Go Cafe", "please turn on/restart your location service.")
            }
        }
        catch( err ) {
            Alert.alert("Go Go Cafe", "please turn on your location service.")
        }
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchId)
    }

    render() {
        const { gogoLocation, region, mylocation, ready, mapping } = this.state
        return (
            <Container>
                <Nav 
                title={"Visit Us"}
                left={
                    { text: "Menu", onPress: () => this.props.navigation.navigate("Menu") }
                }
                right={
                    { text: "Favorties", onPress: () => this.props.navigation.navigate("Favorites") }
                }
                />
                <View style={{ flex: 1, position: "relative" }}>
                    <MapView 
                    style={styles.map}
                    region={ready ? mapping : gogoLocation}
                    >
                        <Marker 
                        key={'marker-key-map-0'}
                        coordinate={gogoLocation}
                        title={"Go Go Cafe"}
                        description={"Japanese Restaurant and Cafe."}
                        >
                            <Image source={require("./../img/gogopin.png")} style={{ width: 50, height: 50 }} />
                        </Marker>
                        {
                            mylocation ? (
                                <Marker 
                                key={'marker-key-map-1'}
                                coordinate={region}
                                title={"My Location"}
                                ><Icon name={"locate"} /></Marker>
                            ) : null
                        }
                    </MapView>
                </View>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    button: {
        position: "absolute",
        bottom: 20,
        right: 0,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 999999
    }
});
export default Location