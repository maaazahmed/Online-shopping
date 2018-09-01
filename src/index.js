import { StackNavigator } from "react-navigation"

import {
    Signup,
    SplashScreen,
    Dashboard,
    SignIn,
    AdminDashboard,
    TestComponent
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
},{
    initialRouteName:"AdminDashboard"
})

export default Router