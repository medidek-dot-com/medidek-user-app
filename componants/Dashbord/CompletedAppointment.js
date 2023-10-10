import { useState, useCallback } from "react"
import { Text, View, Image, TouchableOpacity, FlatList } from "react-native"
import ReviewPopUp from "./popUp/ReviewPopUp"
import { useFocusEffect } from "@react-navigation/native";
import { useRecoilValue } from "recoil";
import { Userdata } from "../Recoil/Atom";
import { axiosClient } from "../utils/axiosClient";

const CompletedAppointment = () => {
  const [allAppointment, setAllAppointment] = useState([]);
  const [doctorId, setDoctorId] = useState("");
  const UserId = useRecoilValue(Userdata);

  const [loading, setLoading] = useState(true);
  useFocusEffect(
    useCallback(() => {
      getAppointment();
    }, [])
  );
  const [open, setopen] = useState(false)

  const OpenPopUp = (Id) => {
    setDoctorId(Id)
    setopen(!open)
  }


  const getAppointment = async () => {
    try {
      const result = await axiosClient.get(`getCompletedAppointment/${UserId[0]._id}`);
      console.log(result.data.data);
      setAllAppointment(result.data.data);
      setLoading(false); // Hide loading indicator when data is loaded
    } catch (error) {
      console.error("Error fetching appointments:", error);
      // Handle the error and provide user feedback
      setLoading(false); // Hide loading indicator on error
    }
  };

  return (
    <>
    <FlatList data={allAppointment}
    style={{backgroundColor:"#ffffff"}}
    renderItem={({item})=> {
      return   <View style={{ paddingHorizontal: 16, paddingTop: 12, flex: 1 }}>
      <View style={{ backgroundColor: "#DCE3F6", paddingHorizontal: 10, paddingVertical: 10, borderRadius: 10, width: "100%" }}>
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <View style={{ height: 84, width: 84, borderRadius: 42 }}>
            <Image source={require("../Assets/girl.png")} style={{ width: "100%", height: "100%" }}></Image>
          </View>
          {/* Doctors information */}
          <View style={{ flex: 1, flexWrap: "wrap" }}>
            <View style={{ display: "flex", flexDirection: "row", gap: 3, }}>
              <Text style={{ color: "#383838", fontWeight: "600", fontSize: 18 }}>
                Dr {item.doctorsName}
              </Text>
              {/* Icon */}
            </View>

            <Text style={{ color: "#706D6D" }}>Date: 25/06/2023</Text>
          </View>
        </View>
        <TouchableOpacity onPress={()=>OpenPopUp(item.doctorsId)}>
          <View style={{ backgroundColor: "#1F51C6", width: "100%", paddingVertical: 12, marginVertical: 12, borderRadius: 20 }}>
            <Text style={{ fontWeight: "600", fontSize: 16, textAlign: "center",color:"#ffffff" }}>Reviews</Text>
          </View>
        </TouchableOpacity>
      </View>

    </View>
    } }
    />
      {open ? <ReviewPopUp OpenPopUp={OpenPopUp} doctorId={doctorId} /> : null}
    </>
  )
}

export default CompletedAppointment