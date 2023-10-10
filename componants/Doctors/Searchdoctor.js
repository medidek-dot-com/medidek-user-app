import React, { useState } from "react";
import { View, Image, TextInput, Text, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ImageBackground } from "react-native";
import { Userdata, UserselectedHospital, Userlocation } from "../Recoil/Atom";
import { useRecoilState } from "recoil";

const Searchdoctor = (props) => {
  const [locations, setLocations] = useState([
    { city: "Nagpur" },
    { city: "Wardha" },
    { city: "Chandrapur" },
    { city: "Mumbai" },
  ]);

  const [specialties, setspecialties] = useState([
    { hospital: "eye" },
    { hospital: "Fever" },
    { hospital: "Pregnancy" },
    { hospital: "Bp" },
    { hospital: "Bones" },
    { hospital: "Diabetes" },
    { hospital: "Dentist" },
    { hospital: "Body" },
  ]);

  const [user, setuser] = useRecoilState(Userdata);
  const [selectedHopital, setSelectedHopital] = useRecoilState(UserselectedHospital);
  const [userlocation, setUserLocation] = useRecoilState(Userlocation);

  const [locationSearchText, setLocationSearchText] = useState(user[0].location); // Separate state for location search
  const [specialtiesearchText, setspecialtiesearchText] = useState(""); // Separate state for hospital search

  const [filteredLocations, setFilteredLocations] = useState([]);
  const [filteredspecialties, setFilteredspecialties] = useState([]);

  const [isLocationListOpen, setLocationListOpen] = useState(false);
  const [isSpecialtiesListOpen, setSpecialtiesListOpen] = useState(false);

  const handleLocationSearch = (text) => {
    setLocationSearchText(text); // Update location search text

    // Filter the locations based on the input text
    const filtered = locations.filter((location) =>
      location.city.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredLocations(filtered);
    setLocationListOpen(true);
    setSpecialtiesListOpen(false);
  };

  const handlespecialtiesearch = (text) => {
    setspecialtiesearchText(text); // Update hospital search text

    // Filter the specialties based on the input text
    const filtered = specialties.filter((hospital) =>
      hospital.hospital.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredspecialties(filtered);
    setSpecialtiesListOpen(true);
    setLocationListOpen(false);
  };

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setLocationSearchText(item.city);
        setUserLocation(item.city); // Update location search text
        setFilteredLocations([]);
        setLocationListOpen(false);
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5  }}>
        <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
        <Text style={{ padding: 10, color: "black" }}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHospitalItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setspecialtiesearchText(item.hospital); // Update hospital search text
        setFilteredspecialties([]);
        setSelectedHopital(item.hospital);
        setSpecialtiesListOpen(false);
        props.navigation.navigate("SelectDoctor");
       
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5  }}>
        <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
        <Text style={{ padding: 10, color: "black" }}>{item.hospital}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "#FFFFFF" }}>
        {/* Location input */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            borderRadius: 20,
            paddingHorizontal: 16,
            backgroundColor: "#DCE3F6",
            marginVertical: 10,
          }}
        >
          <Image source={require("../Assets/location.png")} style={{ width: 18, height: 24 }} />
          <TextInput
            placeholder="Select your Location"
            placeholderTextColor="#706D6D"
            style={{ color: "black" }}
            value={locationSearchText}
            onChangeText={handleLocationSearch}
          />
        </View>

        {/* Hospital input */}
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            borderRadius: 20,
            paddingHorizontal: 16,
            backgroundColor: "#DCE3F6",
            marginBottom: 10,
          }}
        >
          <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 24 }} />
          <TextInput
            placeholder="Search specialties"
            placeholderTextColor="#706D6D"
            style={{ color: "black" }}
            value={specialtiesearchText}
            onChangeText={handlespecialtiesearch}
          />
        </View>

        {/* Render matching locations */}
      

        {/* Rest of your UI */}

        {/* backgroundImage */}
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" ,position:"relative" }}>

          <View style={{position:"absolute",top:0,width:"100%",zIndex:1}}>
          {isLocationListOpen && filteredLocations.length > 0 && (
          <FlatList
            data={filteredLocations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.city}
            style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 10, paddingHorizontal: 10  }}
          />
        )}

        {/* Render matching specialties */}
        {isSpecialtiesListOpen && filteredspecialties.length > 0 && (
          <FlatList
            data={filteredspecialties}
            renderItem={renderHospitalItem}
            keyExtractor={(item) => item.hospital}
            style={{ backgroundColor: "#FFFFFF", width: "100%", borderRadius: 10, paddingHorizontal: 10 }}
          />
        )}
          </View>
          <ImageBackground source={require("../Assets/Searchimagepic.png")} style={{ width: 296, height: 296 }} resizeMode="cover" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Searchdoctor;
