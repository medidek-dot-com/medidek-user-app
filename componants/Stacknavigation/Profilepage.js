


import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { useRecoilState } from "recoil";
import { Userdata } from "../Recoil/Atom";
import LogOutPopUp from "./AppointmentPopup/LogoutPopUp";
import { useState } from "react"

const Profile = (props) => {
    const [userProfile, setProfile] = useRecoilState(Userdata)
    const [showLogOutPop,setShowLogOutPop]=useState(false)
    const OpenPopUp=()=>{
        setShowLogOutPop(!showLogOutPop)
    }
  
    
    return <>
        <View style={{ paddingHorizontal: 10, flex: 1 }}>

            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 5, paddingVertical: 30 }}>
                <View style={{ width: 106, height: 106, borderRadius: 53 }}>
                    <Image style={{ height: "100%", width: "100%" }} source={require("../Assets/avatarnew.png")}></Image>
                </View>
                <Text style={{ color: "#383838", fontSize: 24 }}>{userProfile[0].name}</Text>
            </View>


            <View style={{ display: "flex", gap: 8 }} >
                <TouchableOpacity onPress={() => props.navigation.navigate("EditProfile")}>
                    <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View>

                                <Image style={{ height: 16, width: 16 }} source={require("../Assets/edit-icon.png")}></Image>
                            </View>
                            <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>EditProfile</Text>
                        </View>
                        <View>
                            <Image style={{ height: 16, width: 16, tintColor: "#383838" }} source={require("../Assets/arrow.png")}></Image>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => props.navigation.navigate("Dashbord")}>

                    <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View>
                                {/* <Image></Image> */}
                                <Image style={{ height: 18, width: 18 }} source={require("../Assets/appointment.png")}></Image>
                            </View>
                            <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>View Appointments</Text>
                        </View>
                        <View >
                            <Image style={{ height: 16, width: 16, tintColor: "#383838" }} source={require("../Assets/arrow.png")}></Image>
                        </View>
                    </View>
                </TouchableOpacity>


                <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View>
                            <Image style={{ height: 18, width: 18 }} source={require("../Assets/help.png")}></Image>
                        </View>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>Need help</Text>
                    </View>

                </View>


            <TouchableOpacity   onPress={()=>setShowLogOutPop(!showLogOutPop)}>

            <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}
          
            >
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View>
                            <Image style={{ height: 18, width: 18 }} source={require("../Assets/logout.png")}></Image>
                        </View>
                        <Text style={{ fontSize: 15, color: "black", fontWeight: "500" }}>Log Out</Text>
                    </View>

                </View>
            </TouchableOpacity>

                {/* <View style={{ borderWidth: 1, paddingVertical: 12, display: "flex", justifyContent: "space-between", flexDirection: "row", paddingHorizontal: 6, borderColor: "#D9D9D9", borderRadius: 5 }}>
                    <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }}>
                        <View>
                            <Image style={{ height: 16, width: 16 }} source={require("../Assets/delete.png")}></Image>
                        </View>
                        <Text style={{ fontSize: 15, color: "#B92612", fontWeight: "500" }}>Delete Account</Text>
                    </View>

                </View> */}
            </View>

            <View style={{ flex: 1, margin: 0, alignItems: "center", position: "relative" }}>
                <View style={{ display: "flex", alignItems: "center", position: "absolute", bottom: 0 }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ color: "#1F51C6" }}>Copyright @ medidek</Text>

                    </View>
                </View>
            </View>
        </View>
        {showLogOutPop?<LogOutPopUp OpenPopUp={OpenPopUp}/>:null}
    </>
}

export default Profile