import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron
    .configure({ name: 'React Native App' }) // Set up connection & app name
    .useReactNative() // Add all built-in React Native plugins
    .connect(); // Connect to Reactotron

  console.tron = Reactotron; // Add Reactotron to console
  Reactotron.clear(); // Clear Reactotron logs on every reload
}
