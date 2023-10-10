import React, { useEffect, useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { axiosClient } from "../utils/axiosClient";
import { useRecoilValue } from "recoil";
import { Userdata } from "../Recoil/Atom";
import { useFocusEffect } from "@react-navigation/native";
const Reports = (props) => {
    const userData = useRecoilValue(Userdata);
    const [record, setRecord] = useState([]);
    useFocusEffect(
        useCallback(() => {
            // This code will run when the tab screen is focused.
            // You can perform any necessary updates here.
            getAllRecords();
        }, [])
    );

    const getAllRecords = async () => {
        try {
            const result = await axiosClient.get(`getMedicalRecordOfuser/${userData[0]._id}`);
            console.log(result.data.result.medicalRecord);
            setRecord(result.data.result.medicalRecord);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    };

    return (
        <View style={{ paddingHorizontal: 6, paddingVertical: 16, flex: 1, backgroundColor: "#FFFFFF" }}>
            <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 8, display: "flex", flexDirection: "row", justifyContent: "space-between", borderRadius: 10 }}>
                <View>
                    <Text style={{ color: "#383838", fontWeight: "600", fontSize: 16 }}>Upload Medical Report</Text>
                    <Text style={{ color: "#706D6D", fontWeight: "600", fontSize: 16 }}>Save all your medical records</Text>
                    <Text style={{ color: "#706D6D", fontWeight: "600", fontSize: 16 }}>in one place</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate("UploadRecord")} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>

                    <View style={{ backgroundColor: "#1F51C6", justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "row", paddingHorizontal: 10, paddingVertical: 8, borderRadius: 20, gap: 9 }}>
                        <Text>Upload</Text>
                        <Image source={require("../Assets/Group-760.png")} />
                    </View>

                </TouchableOpacity>
            </View>

            {record.length > 0 ? (
                // <View>
                //   <Text style={{ color: "black" }}>Your Records</Text>
                //   <FlatList
                //     data={record}
                //     renderItem={({ item }) => {
                //       return (
                //         <View>
                //           <Text>{item.text}</Text> {/* Replace 'text' with the actual text property */}
                //         </View>
                //       );
                //     }}
                //     keyExtractor={(item) => item.id}
                //   />
                // </View>
                <>
                    <Text style={{ color: "#000000", fontWeight: "500", fontSize: 16 }}>Your Records</Text>
                    <ScrollView>
                        {record.map((item, i) => {
                             const dt = new Date(item.createdDate);
                             const date = dt.toISOString().split('T')[0];
                            return <View key={i} style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 5, paddingVertical: 10, borderRadius: 5, marginVertical: 8, justifyContent: "space-between", flexDirection: "row" }}>
                                {/* <View  style={{ flexDirection: "row" ,display:"flex",alignItems:"center" }}>
                                <View style={{ backgroundColor: "#1F51C6",padding:10}}><Image source={require("../Assets/recordfileicon.png")}
                                    style={{ width: 40, height: 40, }}
                                ></Image></View>
                                <Text style={{ color: "black" }}> Record {i + 1} {item.medicalRecordName}</Text>
                            </View>


                            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:20}}>
                                <TouchableOpacity>
                                <Image source={require("../Assets/downloadicon.png")} style={{ width: 20, height: 30, }}></Image>
                                </TouchableOpacity>
                              <TouchableOpacity><Image source={require("../Assets/delete_icon.png")} style={{ width: 20, height: 20, }}></Image></TouchableOpacity>
                            </View> */}
                                <View>
                                    <Image source={{ uri: item.medicalImg }} style={{ width: 150, height: 150 ,borderRadius:5 }}></Image>
                                </View>
                                <View style={{ flex: 1,justifyContent:"center",alignItems:"center" }}>
                                    <View><Text style={{color:"black"}}>Date: {date}</Text></View>                                    
                                    <View>
                                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 20 }}>
                                            <TouchableOpacity><Image source={require("../Assets/downloadicon.png")} style={{ width: 20, height: 30, }}></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity><Image source={require("../Assets/delete_icon.png")} style={{ width: 20, height: 20, }}></Image></TouchableOpacity>
                                        </View> 
                                    </View>
                                </View>
                            </View>
                        })}
                    </ScrollView>
                </>
            ) : (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    {/* You can add a message here for when there are no records */}
                    <Image source={require("../Assets/Medical-illustration.png")} style={{ marginLeft: 10 }}></Image>
                </View>
            )}
        </View>
    );
};

export default Reports;
