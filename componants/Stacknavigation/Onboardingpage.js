import React, { useEffect, useState ,useCallback } from "react";
import { Image, ImageBackground, StatusBar, Text, View } from "react-native";
import * as Animatable from "react-native-animatable"; // Import the Animatable library
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation ,useFocusEffect } from "@react-navigation/native";
import { useRecoilState , } from "recoil";
import { Userdata } from "../Recoil/Atom";

const OnBoardingPage = () => {
  const [Patient, setPatient] = useRecoilState(Userdata);
  const navigation = useNavigation();

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     Timer();
  //   }, 5000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);

  useFocusEffect(
    useCallback(() => {
      // Function to check if the user is logged in by verifying the presence of a toke
      const timer = setTimeout(() => {
        Timer();
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
      // Call the function to check user login status when the component is focused
   
    }, [])
  );

  async function Timer() {
    const Token = await AsyncStorage.getItem("token");
    const Data = await AsyncStorage.getItem("userData");
    const UserData = await JSON.parse(Data);

    if (Token) {
      setPatient([UserData]);
      navigation.navigate("tabbord");
    } else {
      navigation.navigate("Slidingpages");
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#F5F5F5" barStyle="dark-content" />
      <View>
        <ImageBackground
          source={require("../Assets/first_icon.png")}
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Animatable.Image
              animation="zoomIn" // You can choose from various animations
              iterationCount={1} // Number of times the animation should run
              duration={4000}
              direction="alternate" // Specify the direction of the animation
              source={require("../Assets/MedidekOriginallogo.png")}
              style={{ height: 250, width: 250 }}
              resizeMode="contain"
            ></Animatable.Image>
          </View>
        </ImageBackground>
      </View>
    </>
  );
};

export default OnBoardingPage;
