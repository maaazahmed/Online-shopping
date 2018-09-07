import { StackNavigator } from "react-navigation";

import {
    Signup,
    SplashScreen,
    Dashboard,
    SignIn,
    AdminDashboard,
    TestComponent,
    ProductComponent,
    ShopkeeperDashboard,
    ExtraDetails,
    Vieworders,
    OrderDetails,
    MyOrders
} from "./Components/index";


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
    ExtraDetails: {
        screen: ExtraDetails,
        navigationOptions: {
            header: null
        }
    },
    Vieworders: {
        screen: Vieworders,
        navigationOptions: {
            header: null
        }
    },
    OrderDetails: {
        screen: OrderDetails,
        navigationOptions: {
            header: null
        }
    },
    MyOrders: {
        screen: MyOrders,
        navigationOptions: {
            header: null
        }
    },
}, {
        initialRouteName: "SignIn"
    })

export default Router