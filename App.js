/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from "react";
import { createAppContainer, createStackNavigator, createSwitchNavigator, createMaterialTopTabNavigator } from "react-navigation"
import { StyleProvider, Icon, Root, Text } from "native-base"
import { View } from "react-native"
import getTheme from "./native-base-theme/components"
import material from "./native-base-theme/variables/material"
// screens
import Home from "./app/screens/Home"
import Menu from "./app/screens/Menu"
import Favorites from "./app/screens/Favorites"
import Location from "./app/screens/Location"
import Products from "./app/screens/Products"
import LoadingScreen from "./app/screens/LoadingScreen"
import SingleProduct from "./app/screens/SingleProduct"

class App extends React.Component {
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Root>
          <MyApp />
        </Root>
      </StyleProvider>
    )
  }
}

const tabBarOptions = {
  initialRouteName: "Home",
  tabBarPosition: 'bottom',
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    activeTintColor: "#FF9800",
    inactiveTintColor: "grey",
    labelStyle: { fontFamily: "Montserrat", fontSize: 10 },
    style: {
      elevation: 0,
      backgroundColor: "#ffffff"
    },
    indicatorStyle: {
      borderColor: "#FF9800",
      borderBottomWidth: 3
    },
    showIcon: true,
  }
}

const navIcon = ( name ) => ({ tintColor, focused }) => (
  <Icon style={{ color: tintColor }} name={name} />
)

const _Products = createStackNavigator({
  Products: {
    screen: Products
  },
  SingleProduct: {
    screen: SingleProduct
  }
},
{
  initialRouteName: "Products",
  headerMode: "none",
  navigationOptions: {
    header: null,
    tabBarIcon: navIcon("cafe")
  }
})

const _Menu = createStackNavigator({
  Menu: {
    screen: Menu
  },
  Products: _Products
},
{
  headerMode: "none",
  navigationOptions: {
    header: null,
    tabBarIcon: navIcon("cafe")
  }
})

const _Loading = createStackNavigator({
  Loading: {
    screen: LoadingScreen
  }
},
{
  headerMode: "none",
  navigationOptions: {
    header: null
  }
})

const _Home = createStackNavigator({
  Home: {
    screen: Home
  },
  SingleProduct: {
    screen: SingleProduct
  }
},
{
  headerMode: "none",
  navigationOptions: {
    header: null,
    tabBarIcon: navIcon("home")
  }
})

const _Favorites = createStackNavigator({
  Favorites: {
    screen: Favorites,
    params: { favorites: "[]" }
  },
  SingleProduct: {
    screen: SingleProduct
  }
}, {
  initialRouteKey: "FavoritesKey",
  headerMode: "none",
  navigationOptions: ({ navigation }) => {
        const { favorites } = navigation.state.routes[0].params
        const counter = favorites === null ? 0 : JSON.parse(favorites).length
        return {
            header: null,
            tabBarIcon: ({ tintColor, focused }) => {
                if( counter ) {
                    return (
                        <View>
                            <View style={style.badge}>
                                <Text style={{ fontSize: 8, color: "#ffffff" }}>{ counter > 99 ? counter + "+" : counter }</Text>
                            </View>
                            <Icon style={{ color: tintColor }} name={"heart"} />
                        </View>
                    )
                } else {
                    return (<Icon style={{ color: tintColor }} name={"heart"} />)
                }
            }
        }
    }
})
const BottomNavigation = createMaterialTopTabNavigator({
  Home: _Home,
  Menu: _Menu,
  Favorites: _Favorites,
  Location: {
    screen: Location,
    navigationOptions: {
      title: "Visit Us",
      tabBarIcon: navIcon("pin")
    }
  }
}, tabBarOptions)
const MyApp = createAppContainer(createSwitchNavigator(
  {
    Loading: _Loading,
    Bottom: BottomNavigation
  }
))
const style = {
  badge: {
      position: "absolute", backgroundColor: "#F44336", top: 3, right: -13, width: 15, height: 15, borderRadius: 100, justifyContent: "center",
      flex: 1, alignItems: "center", zIndex: 99999
  }
}
export default App