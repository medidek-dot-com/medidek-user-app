import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert, ImageBackground } from "react-native";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Userdata, Usertoken } from "../../Recoil/Atom";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { axiosClient } from "../../utils/axiosClient";

const LoginWithEmail = (props) => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [Profile, setProfile] = useRecoilState(Userdata); // Use useRecoilState to read and update state
  console.log(user);
  console.log(Profile);

  useEffect(() => {
    console.log(Profile);
  }, [Profile]);

  const FindUser = async () => {
    try {
      if (!user.email || !user.password) {
        return Alert.alert("Some fields are required");
      }
      console.log("click");
      const result = await axiosClient.post("FindUserByNameAndPassword", user)
      // const result = await axios.post(
      //   "https://medidek-backend-wz4l.onrender.com/v2/FindUserByNameAndPassword",
      //   user
      // );
      // console.log(result.data.result.accessToken,".......lokesh");

      if (result.data.statusCode === 200) {
        await AsyncStorage.setItem("token", result.data.result.accessToken)
        await AsyncStorage.setItem("userData", JSON.stringify(result.data.result.user))
        Alert.alert("Welcome");
        setProfile([result.data.result.user]);
        // Update Profile using setProfile
        props.navigation.navigate("tabbord");
      } else {
        Alert.alert("User not found!!");
      }
    } catch (error) {
      console.log("from mine ");
      console.log(error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
      }}
    >
      <ImageBackground source={require('../../Assets/BackgroundImg.png')} resizeMode="cover" style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#1F51C6",
            alignItems: "center",
            width: "100%",
            paddingVertical: 8,
            paddingHorizontal: 14,
            gap: 12,
            borderRadius: 9,
         
          }}
        >
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={{ color: "#FFFFFF", fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
              Welcome Back!
            </Text>
            <View
              style={{
                borderRadius: 20,
                overflow: "hidden",
                backgroundColor: "white",
                justifyContent: "space-between",
                gap: 4,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center", paddingVertical: 10 }}
                onPress={() => props.navigation.navigate("loginWithNumber")}
              >
                <Text style={{ color: "#383838", fontWeight: "500" }}>
                  Login With Number
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  borderRadius: 20,
                  backgroundColor: "#15B912",
                  alignItems: "center",
                  paddingVertical: 8,
                }}
              >
                <Text style={{ color: "#FFFFFF", fontWeight: "500" }}>
                  Login With Email
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: "100%" }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF" }}
              placeholder="Email"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setUser({ ...user, email: e })}
            />
          </View>

          <View style={{ width: "100%" }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF" }}
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setUser({ ...user, password: e })}
            />
          </View>
          <View style={{ justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
            <Text>Remember me</Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("ForgotPassword")}><Text>Forgot Password ?</Text></TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              width: "100%",
              backgroundColor: "#FFFFFF",
              paddingVertical: 10,
              borderRadius: 25,
              alignItems: "center",
            }}
            onPress={FindUser}
          >
            <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => props.navigation.navigate("createAccountpage")}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "400" }}>
                Do not have Account ? Click here
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>

    </View>
  );
};

export default LoginWithEmail;
