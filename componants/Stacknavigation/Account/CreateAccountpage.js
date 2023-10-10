import React, { useState, useRef, useEffect } from "react";
import {
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { useRecoilState } from "recoil";
import { UserDataForCreateAccount } from "../../Recoil/Atom";

const CreateAccountpage = () => {
  const [userAccount, setuserAccount] = useState({
    name: "",
    email: "",
    dateOfBirth: "",
    phone: "",
    password: "",
  });
  const [UserForCreateAccount, setUserDataForCreateAccount] = useRecoilState(
    UserDataForCreateAccount
  );
  const [isLoading, setIsLoading] = useState(false); // State to track loading
  const navigation = useNavigation();
  const timeoutRef = useRef(null); // Ref to store the timeout ID

  const CreateUser = async () => {
    try {
      if (
        !userAccount.name ||
        !userAccount.phone ||
        !userAccount.email ||
        !userAccount.password
      ) {
        return Alert.alert("Some fields are required");
      }

      // Disable the button and show loader
      setIsLoading(true);

      const result = await axios.post(
        "https://medidek-backend-wz4l.onrender.com/v2/userCreation",
        userAccount
      );

      if (result.data.statusCode == 409) {
        Alert.alert("User already exists with the given email");
      } else {
        Alert.alert("OTP sent Successfully!!");
        setUserDataForCreateAccount([userAccount]);
        navigation.navigate("Otpverification");
      }
    } catch (error) {
      console.log(error);
    } finally {
      // Enable the button and hide loader after 20 seconds
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 20000);
    }
  };

  useEffect(() => {
    // Clear the timeout when the component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,paddingHorizontal:14 }}>
      <ImageBackground
        source={require("../../Assets/BackgroundImg.png")}
        resizeMode="cover"
        style={{ width: "100%", height: "100%", justifyContent: "center", alignItems: "center" }}
      >
        <View
          style={{
            backgroundColor: "#1F51C6",
            width: "100%",
            alignItems: "center",
            borderRadius: 5,
            paddingVertical: 14,
            paddingHorizontal: 15,
            gap: 6,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>Create Account</Text>
          <View style={{ width: '100%' }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", }}
              placeholder="+91"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setuserAccount({ ...userAccount, phone: e })}
              keyboardType="numeric"
              editable={!isLoading} // Disable input field when loading
            ></TextInput>
          </View>
          <View style={{ width: '100%' }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", }}
              placeholder="Full Name"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setuserAccount({ ...userAccount, name: e })}
              editable={!isLoading}
            ></TextInput>
          </View>
          <View style={{ width: '100%' }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", }}
              placeholder="Email Address"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setuserAccount({ ...userAccount, email: e })}
              editable={!isLoading}
            ></TextInput>
          </View>
          <View style={{ width: '100%' }}>
            <TextInput
              style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF", }}
              placeholder="Password"
              placeholderTextColor="#FFFFFF"
              onChangeText={(e) => setuserAccount({ ...userAccount, password: e })}
              editable={!isLoading}
              secureTextEntry // Hide password
            ></TextInput>
          </View>

          <View style={{ width: '100%' }}>
            <Text style={{ color: "#FFFFFF", fontSize: 12 }}>By continuing, you agree to Medidek’s Terms of Service & Privacy Policy</Text>
          </View>

          <View style={{ width: '100%', gap: 4 }}>
            <TouchableOpacity onPress={CreateUser} disabled={isLoading}>
              <View style={{ width: "100%", backgroundColor: "#FFFFFF", paddingVertical: 10, borderRadius: 14, alignItems: "center" }}>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
                  {isLoading ? "Loading..." : "Continue"}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("loginWithNumber")} disabled={isLoading}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <Text style={{ color: "white", fontSize: 12, fontWeight: "400" }}>Already have an Account? Click here</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreateAccountpage;
