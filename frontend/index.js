/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent('main', () => App);  // appName (when using react-native-cli) -- 'main' (when using Expo)
