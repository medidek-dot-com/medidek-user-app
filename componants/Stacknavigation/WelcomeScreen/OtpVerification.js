import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserDataForCreateAccount, Userdata } from "../../Recoil/Atom";
import { axiosClient } from "../../utils/axiosClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Otpverification = (props) => {
  const DataForCreateAccount = useRecoilValue(UserDataForCreateAccount);
  const [userdata, setUserData] = useRecoilState(Userdata);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [Otp, setOtp] = useState(["", "", "", "", "", ""]); // Initialize OTP state with empty strings
console.log(Otp.join(""));
  const focusNextInput = (index) => {
    if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    } else {
      // If the user is in the last input field, you can add logic to trigger an action,
      // such as submitting the OTP.
      // For example: props.navigation.navigate("tabbord");
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace") {
      // If the user presses the Backspace key, move to the previous input field
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  const handleOtpChange = (text, index) => {
    // Update the OTP state when a single digit is entered
    if (text.length === 1) {
      const newOtp = [...Otp];
      newOtp[index] = text;
      setOtp(newOtp);
    } else if (text === "") {
      // Clear the OTP field if the user deletes the number
      const newOtp = [...Otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }

    if (text) {
      // Automatically move to the next input field if there is input
      focusNextInput(index);
    }
  };

  const VerifyOtp = async () => {
    const result = await axiosClient.post("/userVarify", { ...DataForCreateAccount[0], otp: Number(Otp.join("")) });
    if (result.data.statusCode === 200) {
      await AsyncStorage.setItem("token",result.data.result.accessToken)
      await AsyncStorage.setItem("userData",JSON.stringify(result.data.result.user))
      setUserData([result.data.result.user]);
      props.navigation.navigate("tabbord");
      console.log(result.data.result.accessToken);
    } else {
      Alert.alert("Invalid OTP");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
      <View style={{ backgroundColor: "#1F51C6", alignItems: "center", width: "100%", paddingVertical: 14, paddingHorizontal: 18, borderRadius: 9, gap: 6 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Verification Code</Text>
        <Text style={{ fontSize: 12, textAlign: "center", paddingHorizontal: 6 }}>We have sent the code verification to your Mobile Number</Text>
        <View style={{ flexDirection: "row", gap: 6, marginVertical: 8 }}>
          {inputRefs.map((ref, index) => (
            <TextInput
              key={index}
              ref={ref}
              style={{ backgroundColor: "white", flex: 1, color: "black", borderRadius: 8 }}
              textAlign={"center"}
              keyboardType="numeric"
              maxLength={1} // Limit the input length to 1 character
              value={Otp[index]} // Set the value of the input field to the corresponding OTP digit
              onChangeText={(text) => handleOtpChange(text, index)} // Handle OTP changes
              onKeyPress={(e) => handleKeyPress(e, index)}
            />
          ))}
        </View>

        <TouchableOpacity style={{ width: "100%", backgroundColor: "#FFFFFF", paddingVertical: 10, borderRadius: 16, alignItems: "center" }} onPress={VerifyOtp}>
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otpverification;
