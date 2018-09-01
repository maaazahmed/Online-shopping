import {AppRegistry} from 'react-native';
import Main from './Main';
import Router from "./src/index";
import { Provider } from "react-redux"
import store from "./src/store/index"

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Main);
