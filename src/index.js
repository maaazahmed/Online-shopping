import { StackNavigator } from "react-navigation"

import {
    Signup,
    SplashScreen,
    Dashboard,
    SignIn,
    AdminDashboard,
    TestComponent,
    ProductComponent,
    ShopkeeperDashboard
} from "./Components/index"


const Router = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: {
            header: null
        },
    },
    Signup: {
        screen: Signup,
        navigationOptions: {
            header: null
        }
    },
    AdminDashboard: {
        screen: AdminDashboard,
        navigationOptions: {
            header: null
        }
    },
    SignIn: {
        screen: SignIn,
        navigationOptions: {
            header: null
        }
    },
    
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        }
    },
    TestComponent: {
        screen: TestComponent,
        navigationOptions: {
            header: null
        }
    },
    ProductComponent: {
        screen: ProductComponent,
        navigationOptions: {
            header: null
        }
    },
    ShopkeeperDashboard: {
        screen: ShopkeeperDashboard,
        navigationOptions: {
            header: null
        }
    },
},{
    initialRouteName:"ShopkeeperDashboard"
})

export default Router