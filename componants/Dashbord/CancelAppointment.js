import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { Userdata } from "../Recoil/Atom";
import { axiosClient } from "../utils/axiosClient";

const CancelAppointment = () => {
  const navigation=useNavigation()
  
  const [allAppointment, setAllAppointment] = useState([]);
  const UserId = useRecoilValue(Userdata);
  const [loading, setLoading] = useState(true); // State for loading indicator

  // Function to fetch appointments
  const getAppointment = async () => {
    try {
      const result = await axiosClient.get(`getCancelAppointment/${UserId[0]._id}`);
      console.log(result.data);
      setAllAppointment(result.data.data);
      setLoading(false); // Hide loading indicator when data is loaded
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // Handle the error and provide user feedback
      setLoading(false); // Hide loading indicator on error
    }
  };

  // Fetch appointments when the tab screen is focused
  useFocusEffect(
    useCallback(() => {
      getAppointment();
    }, [])
  );

  return (
    <ScrollView style={{backgroundColor:"#ffffff"}}>
      {loading ? ( // Show loading indicator while fetching data
<View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color="#1F51C6" style={{ marginTop: 20 }} /></View>
      ) : (
        allAppointment.map((item, i) => {
          const dt = new Date(item.appointmentDate);
          const date = dt.toISOString().split('T')[0];
          return (
            <View style={{ paddingHorizontal: 16, paddingTop: 12 }} key={i}>
              <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, width: "100%" }}>
                <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                  <View style={{ height: 84, width: 84, borderRadius: 42 }}>
                    <Image source={require("../Assets/girl.png")} style={{ width: "100%", height: "100%" }}></Image>
                  </View>

                  {/* Doctors information */}
                  <View style={{ flex: 1, flexWrap: "wrap" }}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 3 }}>
                      <Text style={{ color: "#383838", fontWeight: "600", fontSize: 18 }}>
                      Dr {item.doctorsName}
                      </Text>
                      {/* Icon */}
                    </View>

                    <Text style={{ color: "#706D6D" }}>Date: {date}</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={()=>navigation.navigate("ResheduleAppointment",{ id:item.doctorsId })}>
                  <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, marginVertical: 12, borderRadius: 20 }}>
                    <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center",color:"#ffffff" }}>Reschedule</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

export default CancelAppointment;
