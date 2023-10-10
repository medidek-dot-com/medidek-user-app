/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  StatusBar,
} from 'react-native';


// import EditProfile from './componants/Stacknavigation/Editprofile';

import Stack from "./componants/Stacknavigation/Stack"
import { RecoilRoot} from "recoil"
function App() {

  return (
  //  <EditProfile/>
  
  <RecoilRoot>
  <Stack/>
  </RecoilRoot>
 

  );
}



export default App;
