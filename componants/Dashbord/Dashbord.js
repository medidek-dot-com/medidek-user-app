import React, { useEffect, useState, useCallback } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import { axiosClient } from "../utils/axiosClient";
import { useRecoilValue } from "recoil";
import { Userdata } from "../Recoil/Atom";
import { useFocusEffect } from "@react-navigation/native";
import AppointmentCancelPopUp from "../../componants/Stacknavigation/AppointmentPopup/AppointmentCancalpopup";

const Dashbord = () => {
  const [allAppointment, setallappointment] = useState([]);
  const [showAppointment, setShowAppointment] = useState(false);
  const [appointmentId, setAppointmentId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const UserId = useRecoilValue(Userdata);

  console.log(allAppointment);
  useFocusEffect(
    useCallback(() => {
      // This code will run when the tab screen is focused.
      // You can perform any necessary updates here.
      fetchData();
    }, [])
  );

  const fetchData = async () => {
    try {
      setIsLoading(true); // Set loading to true before making the request
      const result = await axiosClient.get(`getPatientAppointment/${UserId[0]._id}`);
      setallappointment(result.data.data);
    } catch (error) {
      // Handle errors here, you can show an error message or perform any other actions
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false when the request is complete (whether it succeeded or failed)
    }
  };

  const cancalAppointment = async (id) => {
    try {
      setIsLoading(true);
      const result = await axiosClient.put(`updateUserAppointment/${id}`, { status: "cancel" });
      if (result.data.statusCode === 201) {
        setShowAppointment(!showAppointment);
        Alert.alert("Cancel Appointment");
      }
    } catch (error) {
      console.error("Error canceling appointment:", error);
      Alert.alert("Error", "Failed to cancel appointment. Please try again later.");
    } finally {
      setIsLoading(false);
      fetchData(); // Refresh data after cancellation
    }
  };

  const OpenPopUp = () => {
    setShowAppointment(!showAppointment);
  };

  return (
   <>
    <ScrollView style={{backgroundColor:"#ffffff"}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#1F51C6" /> // Display loading indicator while fetching data
      ) : (
        allAppointment.map((item, i) =>{
          const dt = new Date(item.appointmentDate);
          const date = dt.toISOString().split('T')[0];

          const cd = new Date(item.createddate);
          const cddate = cd.toISOString().split('T')[0];

          return  <View style={{ paddingHorizontal: 6, paddingVertical: 16, backgroundColor: "#FFFFFF", flex: 1 }} key={i} >
          <View style={{ paddingHorizontal: 9, backgroundColor: "#DCE3F6", justifyContent: "space-between", flexDirection: "row", paddingVertical: 20, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}>
              <View>
                  <Text style={{ color: '#383838', fontSize: 24, fontWeight: 'bold' }}>Thank You</Text>
                  <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: "normal" }}>You are Application had been booked</Text>
              </View>
              <View>
                  <View style={{ height: 70, width: 70, backgroundColor: "#15B912", borderRadius: 35, justifyContent: "center", alignItems: "center" }}>
                      <Image source={require("../Assets/Right.png")} style={{ width: "60%", height: "60%" }} resizeMode="contain"></Image>
                  </View>
              </View>
          </View>
          <View style={{ paddingHorizontal: 9, backgroundColor: "#DCE3F6", paddingVertical: 12, marginTop: 1 }}>
              <View>
                  <Text style={{ color: '#383838', fontSize: 18, fontWeight: 'bold' }}>Track appointment</Text>
                  <Text style={{ color: '#1F51C6', fontSize: 13, fontWeight: 'bold' }}>Appointment Id: 637438fdh</Text>
                  <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Estimated Time :two hours</Text>
              </View>
              {/* Track system */}
              <View style={{ marginTop: 15 }}>
                  <View style={{ flexDirection: "row", gap: 9 }}>
                      <View><View style={{ height: 22, width: 22, backgroundColor: "#15B912", borderRadius: 11, justifyContent: "center", alignItems: "center" }}>

                          <Image source={require("../Assets/Right.png")} style={{ width: "60%", height: "60%" }} resizeMode="contain"></Image>
                      </View>
                          {/* dotted line */}
                          <View style={{ alignItems: "center", gap: 1 }}>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                          </View>
                      </View>
                      <View  >
                          <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Appointment Confirmed with {item.doctorsName}</Text>
                          <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: 'bold' }}>{item.appointmentTime} PM, {cddate}</Text>
                      </View>
                  </View>

                  <View style={{ flexDirection: "row", gap: 9 }}>
                      <View><View style={{ height: 22, width: 22, borderRadius: 11, borderWidth: 1, borderColor: "#1F51C6", justifyContent: "center", alignItems: "center" }}>
                          <View style={{ height: 14, width: 14, borderRadius: 11, backgroundColor: "#1F51C6" }}></View>
                      </View>
                          {/* dotted line */}
                          <View style={{ alignItems: "center", gap: 1 }}>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                              <View style={{ height: 5, width: 2, backgroundColor: "#1F51C6" }}></View>
                          </View>
                      </View>
                      <View>
                          <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Dr {item.doctorsName} will start appointments</Text>
                          <Text style={{ color: '#706D6D', fontSize: 13, fontWeight: 'bold' }}>@12:00 PM, {date}</Text>
                      </View>
                  </View>


                  <View style={{ flexDirection: "row", gap: 9 }}>
                      <View><View style={{ height: 22, width: 22, borderRadius: 11, borderWidth: 1, borderColor: "#1F51C6", justifyContent: "center", alignItems: "center" }}>
                          <View style={{ height: 14, width: 14, borderRadius: 11, backgroundColor: "#1F51C6" }}></View>
                      </View>
                          {/* dotted line not for the last element  */}
                      </View>
                      <View>
                          <Text style={{ color: '#383838', fontSize: 13, fontWeight: 'bold' }}>Appointment Completed</Text>
                      </View>
                  </View>
              </View>


          </View>

          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 6 }}>
              <TouchableOpacity style={{ backgroundColor: "#B92612", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}
              onPress={()=>{setAppointmentId(item._id),OpenPopUp()}}
              >
                  <View >
                      <Text style={{ fontWeight: "600", fontSize: 16,color:"#ffffff" }}>Cancel Appoinment</Text>
                  </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={{ backgroundColor: "#1F51C6", flex: 1, paddingVertical: 12, display: "flex", justifyContent: "center", alignItems: "center", borderRadius: 20, marginVertical: 12 }}>
                  <View >
                      <Text style={{ fontWeight: "600", fontSize: 16 }}>Edit Appoinment</Text>
                  </View>
              </TouchableOpacity> */}
          </View>

          <View style={{height:1 ,width:"100%",backgroundColor:"#D9D9D9"}}></View>
      </View>
        } )
      )}
   
    </ScrollView>
       {showAppointment ? (
        <AppointmentCancelPopUp OpenPopUp={OpenPopUp} cancalAppointment={cancalAppointment} appointmentId={appointmentId} />
      ) : null}</>
  );
};

export default Dashbord;
