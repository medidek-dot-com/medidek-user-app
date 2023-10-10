import { View, Text, TextInput, Image, FlatList, ScrollView, TouchableOpacity } from "react-native"
import { useCallback } from "react";
import { useRecoilState } from 'recoil';
import { Userdata } from '../Recoil/Atom';
import { CommonActions, useFocusEffect, useNavigation } from "@react-navigation/native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import   AsyncStorage  from "@react-native-async-storage/async-storage"
const Index = (props) => {
    const navigation = useNavigation()
    // useFocusEffect(
    //     useCallback(() => {
    //     resetRoute()
    //     }, [])
    //   );
    //   const resetRoute =()=>{
    //     navigation.dispatch(
    //         CommonActions.reset({
    //             index:0,
    //             routes:[{name:"Indexpage"}]
    //         })
    //     )
    //   }

    const [selectedLocation, setSelectedLocation] = useRecoilState(Userdata);

    console.log();
    return (
        <>
            <ScrollView style={{ backgroundColor: "#ffffff" }}>
                <View style={{ paddingHorizontal: 12, flex: 1 }}>
                    <View style={{ width: "100%", paddingVertical: 4, display: "flex", justifyContent: "space-between", flexDirection: "row", marginTop: 10 }}>
                        <View style={{ paddingVertical: 4, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", gap: 8 }}>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Location")}>
                                <Image source={require("../Assets/location.png")} style={{ width: 18, height: 24 }}></Image>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => props.navigation.navigate("Location")} >
                                <View style={{ backgroundColor: "#DCE3F6", width: 100, borderRadius: 5 ,alignItems:"center" }}>
                                    <Text style={{ color: "#383838", fontSize: 16, padding: 4 }}>{selectedLocation[0].location}</Text>
                                </View>
                            </TouchableOpacity>
                            {/* drop Down list  */}
                            {/* <View style={{ paddingVertical: 2, backgroundColor: "#DCE3F6", position: "absolute", height: 100, top: 40, right: 5, zIndex: 10, width: 100, borderRadius: 5, }}>
                                <ScrollView contentContainerStyle={{ gap: 4 }}>
                                    <View style={{ width: "100%", alignItems: "center", paddingVertical: 2, borderWidth: 1 }}><Text style={{ color: "black" }}>Nagpur</Text></View>
                                    <View style={{ width: "100%", alignItems: "center", paddingVertical: 2, borderWidth: 1 }}><Text style={{ color: "black" }}>Nagpur</Text></View>
                                    <View style={{ width: "100%", alignItems: "center", paddingVertical: 2, borderWidth: 1 }}><Text style={{ color: "black" }}>Nagpur</Text></View>
                                    <View style={{ width: "100%", alignItems: "center", paddingVertical: 2, borderWidth: 1 }}><Text style={{ color: "black" }}>Nagpur</Text></View>
                                    <View style={{ width: "100%", alignItems: "center", paddingVertical: 2, borderWidth: 1 }}><Text style={{ color: "black" }}>Nagpur</Text></View>
                                </ScrollView>
                            </View> */}


                            {/* {dropdownVisible && (
                <FlatList
                  data={data}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setDropdownVisible(false);
                        // Handle the selected option here
                      }}
                    >
                      <View
                        style={{
                          width: "100%",
                          alignItems: "center",
                          paddingVertical: 2,
                        }}
                      >
                        <Text style={{ color: "black" }}>{item}</Text>
                      </View>
                    </TouchableOpacity>
                  )}
                  style={{
                    paddingVertical: 2,
                    backgroundColor: "#DCE3F6",
                    position: "absolute",
                    maxHeight: 100,
                    top: 40,
                    right: 5,
                    zIndex: 10,
                    width: 100,
                    borderRadius: 5,
                  }}
                />
              )} */}

                        </View>
                        <View>
                            <TouchableOpacity onPress={() => props.navigation.navigate("Profile")}>
                                <Image source={require("../Assets/avatarnew.png")} style={{ width: 32, height: 32 }}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* top Section end  */}


                    {/* Searching Section Start  */}
                    {/* <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", borderRadius: 20, paddingHorizontal: 16, backgroundColor: "#DCE3F6", marginVertical: 10 }}>
                        <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
                        <TextInput placeholder="Search Doctors/Hospital" placeholderTextColor="#706D6D" style={{ color: "black" }} />
                    </View> */}

                    {/* Searching Section end  */}
                    <View style={{ marginVertical: 10 }}>
                        <Text style={{ color: "#383838", fontSize: 18, fontWeight: "700" }}>Feeling Sick ?</Text>
                        <Text style={{ color: "#706D6D", fontWeight: "500" }}>Treat symptoms with top specialties</Text>
                    </View>



                    <View style={{ width: "100%", height: 241, backgroundColor: "#DCE3F6", display: "flex", justifyContent: "center", alignItems: "center", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 5 }}>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flex: 1 }}>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/diabetesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Diabetes</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/Fever.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Fever</Text>
                            </View>


                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/pregnancynew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Pregnancy</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bp.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bp</Text>
                            </View>

                        </View>
                        <View style={{ display: "flex", flexDirection: "row", width: "100%", justifyContent: "space-between", flex: 1 }} >

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bonesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bones</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/eyesnew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Eyes</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/toothachenew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Toothache</Text>
                            </View>

                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <Image source={require("../Assets/bodyachenew.png")} style={{ width: 66, height: 66 }} />
                                <Text style={{ color: "#383838", fontWeight: "500", fontSize: 12 }}>Bodyache</Text>
                            </View>

                        </View>
                    </View>

                    {/* Button section  */}
                    <TouchableOpacity onPress={() => props.navigation.navigate("Doctors")}>
                        <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100, marginVertical: 12 }}>
                            <Text style={{ fontWeight: "400", fontSize: 16, color: "#ffffff" }}>Book Appoinment</Text>
                        </View>
                    </TouchableOpacity>

                    {/* 
Doctors section  */}
                  <View>
                  <View>
                        <Text style={{ fontWeight: "600", fontSize: 16, color: "black", marginVertical: 12 }}>Find Doctors</Text>
                    </View>
                    <ScrollView horizontal={true} contentContainerStyle={{ gap: 8, justifyContent: 'center' }}>
                        {/* single pics  */}
                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>
                    </ScrollView>
                    <ScrollView horizontal={true} contentContainerStyle={{ gap: 8, justifyContent: 'center' }}>
                        {/* single pics  */}
                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>
                    </ScrollView>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Doctors")}>
                        <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                            <Text style={{ fontWeight: "400", fontSize: 16, color: "#ffffff" }}>View Doctors</Text>
                        </View>
                    </TouchableOpacity>
                  </View>



                    <View>
                        <View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "black", marginVertical: 12 }}> Doctors Near you</Text>
                        </View>
                        <ScrollView horizontal={true} contentContainerStyle={{ gap: 8, justifyContent: 'center' }}>
                            {/* single pics  */}
                            <View style={{ width: 177, height: 250 }}>
                                <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                    <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                                </View>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                                <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                                </Text>
                            </View>

                            <View style={{ width: 177, height: 250 }}>
                                <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                    <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                                </View>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                                <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                                </Text>
                            </View>

                            <View style={{ width: 177, height: 250 }}>
                                <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                    <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                                </View>
                                <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                                <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                                </Text>
                            </View>

                        </ScrollView>
                        <ScrollView horizontal={true} contentContainerStyle={{ gap: 8, justifyContent: 'center' }}>
                        {/* single pics  */}
                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>

                        <View style={{ width: 177, height: 250 }}>
                            <View style={{ width: "100%", height: 177, backgroundColor: "#DCE3F6" }}>
                                <Image source={require("../Assets/Doctorimg.png")} style={{ height: "100%", width: "100%" }}></Image>
                            </View>
                            <Text style={{ fontWeight: "600", fontSize: 16, color: "#383838" }}>Dr shashwant</Text>
                            <Text style={{ fontWeight: "600", fontSize: 13, color: "#706D6D" }}>5 years of exprience
                            </Text>
                        </View>
                    </ScrollView>
                        <TouchableOpacity onPress={() => props.navigation.navigate("Doctors")}>
                            <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 100 }}>
                                <Text style={{ fontWeight: "400", fontSize: 16, color: "#ffffff" }}>View Doctors</Text>
                            </View>
                        </TouchableOpacity></View>
                </View>
            </ScrollView>
        </>
    )
}


export default Index