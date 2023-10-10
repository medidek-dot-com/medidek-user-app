import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import ChangePassword from "./ChangePassword";
import { useRecoilState } from "recoil"
import { Userdata } from "../Recoil/Atom";
import { axiosClient } from "../utils/axiosClient";
// import CalenderPicker from "react-native-calendar-picker"
import DateTimePicker from "react-native-modal-datetime-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfileUser = (props) => {
  let [showPassword, setShowPassword] = useState(false);
  const [userProfile, setuserProfile] = useRecoilState(Userdata)
  console.log(userProfile[0].email)
  const [userAccount, setuserAccount] = useState({ name: userProfile[0].name, email: userProfile[0].email, dateOfBirth: userProfile[0].dateOfBirth, phone: userProfile[0].phone, password: userProfile[0].password, })
  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };

  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 2;
  console.log(userAccount);
  const saveChages = async () => {
    try {
      console.log("click")
      const result = await axiosClient.put(`updateUserpatientByapp/${userProfile[0]._id}`, userAccount)
      console.log(result.data.result);
    

      if (result.data.statusCode == 409) {
        Alert.alert("user Already exist with given email")
      }
      else {
        setuserProfile([result.data.result]);
        await AsyncStorage.setItem("userData",JSON.stringify(result.data.result))
        Alert.alert("Successfully update !!")
      }

    } catch (error) {
      console.log(error)
    }
  }


  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(!isDatePickerVisible);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", date);

    // Parse the date string into a Date object
    const parsedDate = new Date(date);

    // Extract the date, month, and year components
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are 0-indexed
    const day = String(parsedDate.getDate()).padStart(2, '0');

    // Formatted date in yyyy-mm-dd format
    const dateOfBirthofUser = `${day}-${month}-${year}`;

    console.log("Date of Birth: ", dateOfBirthofUser);
    setuserAccount((prev) => {
      return { ...prev, dateOfBirth: dateOfBirthofUser }
    })
    console.log(userAccount);

    // Continue with your code here...

    hideDatePicker();
  };








  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <ScrollView>
        <View style={{ flex: 1, paddingTop: 10, paddingHorizontal: 16, backgroundColor: "#FFFFFF" }}>
          <View>
            <Text style={{ color: "black", fontSize: 20, fontWeight: "600", paddingVertical: 10 }}>
              Edit Profile
            </Text>
          </View>

          <View style={{ borderWidth: 1, height: 600, borderColor: "#D9D9D9", borderRadius: 6, paddingHorizontal: 20, paddingVertical: 10, justifyContent: "space-evenly", gap: 5 }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 20 }}>
              <View style={{ height: 60, width: 60, borderRadius: 30 }}>
                <Image source={require("../Assets/avatarnew.png")} style={{ width: "100%", height: "100%" }} />
              </View>
              <View style={{ display: "flex", justifyContent: "center" }}>
                <Text style={{ color: "#D9D9D9", fontWeight: "700" }}>Pick a picture </Text>
                <Text style={{ color: "#D9D9D9", fontWeight: "700" }}>from your Phone</Text>
<TouchableOpacity><Text style={{ color: "#1F51C6", fontWeight: "500" }}>Change Profile Picture</Text></TouchableOpacity>
              </View>
            </View>

            <View style={{ width: "100%", height: 1, backgroundColor: "#D9D9D9", marginVertical: 6 }}></View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Full Name</Text>
              <TextInput placeholder="First Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black' }} value={userAccount.name}
                onChangeText={(e) => setuserAccount({ ...userAccount, name: e })}
              />
            </View>

            {/* <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Last Name</Text>
              <TextInput placeholder="Last Name" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black' }} />
            </View> */}
            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Update Email Address</Text>
              <TextInput placeholder="Update Email Address" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black' }} value={userAccount.email}
                onChangeText={(e) => setuserAccount({ ...userAccount, email: e })}
              />
            </View>
            <View>



              {/* date section start */}

              <TouchableOpacity onPress={showDatePicker}>
                <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Add Birth date</Text>
                <View style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black', paddingVertical: 14 }} >
                  <Text style={{ color: "black" }}>{userAccount.dateOfBirth}</Text>
                </View>
              </TouchableOpacity>
              <DateTimePicker


                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              {/* date section end */}
            </View>

            <View>
              <Text style={{ color: "#383838", fontSize: 15, fontWeight: "400" }}>Add Mobile Number</Text>
              <TextInput placeholder="Add Mobile Number" placeholderTextColor="#D9D9D9" style={{ width: "100%", borderColor: "#D9D9D9", borderWidth: 1, borderRadius: 3, paddingHorizontal: 12, color: 'black' }} value={userAccount.phone}
                onChangeText={(e) => setuserAccount({ ...userAccount, phone: e })}
              />
            </View>

            <View style={{ direction: "flex", gap: 6, paddingVertical: 12 }}>
              <TouchableOpacity onPress={saveChages}>
                <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                  <Text>Save Changes</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleChangePassword}>
                <View style={{ borderWidth: 1, borderColor: "#D9D9D9", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20 }}>
                  <Text style={{ color: "#383838" }}>Change Password</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {showPassword ? <ChangePassword handleChangePassword={handleChangePassword} /> : null}
      {/* <View style={{position:"absolute",height:"100%" ,width:"100%",backgroundColor:"white",justifyContent:"center"}}>
        <CalenderPicker />
      </View> */}

    </KeyboardAvoidingView>
  );
};

export default EditProfileUser;
