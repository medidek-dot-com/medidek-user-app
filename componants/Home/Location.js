import React, { useState } from 'react';
import { Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useRecoilState } from 'recoil';
import { Userdata } from '../Recoil/Atom';
import axios from 'axios';
import { axiosClient } from '../utils/axiosClient';


const Location = (props) => {
  const [Locations, setLocations] = useState([
    { city: "Nagpur" },
    { city: "Wardha" },
    { city: "Chandrapur" },
    { city: "Mumbai" }
  ]);

  const [searchText, setSearchText] = useState("");
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [User, setUser] = useRecoilState(Userdata);
  const handleSearch = (text) => {
    setSearchText(text);
    // Filter the locations based on the input text
    const filtered = Locations.filter(location =>
      location.city.toLowerCase().includes(text.toLowerCase())
    );

    setFilteredLocations(filtered);
  };

  const handleLocationSelect = async (item) => {
    try {
      setSearchText(item.city);
      setFilteredLocations([]);
      let result = await axiosClient.put(`updateUserpatientByapp/${User[0]._id}`, { location: item.city })
      // console.log(result.data, "...............!!!!!!!!!!!!!!!!!!!!!!!!!!")


      setUser((prev) => {
        return [{ ...prev[0], location: item.city }]
      })

      if (result.data.statusCode === 201) {
        props.navigation.navigate("Indexpage")
      }
    } catch (error) {
      console.log(error)
    }

  };

  const renderLocationItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleLocationSelect(item)}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 5 }}>
        <Image source={require("../Assets/searchnew.png")} style={{ width: 24, height: 25 }} />
        <Text style={{ padding: 10, color: "black" }}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={{ paddingHorizontal: 6, paddingVertical: 10, backgroundColor: "#FFFFFF", flex: 1 }}>
        <View style={{ display: "flex", flexDirection: "row", width: "100%", alignItems: "center", borderRadius: 20, paddingHorizontal: 16, backgroundColor: "#DCE3F6", marginVertical: 10 }}>
          <Image source={require("../Assets/location.png")} style={{ width: 18, height: 24 }} />
          <TextInput
            placeholder="Select your Location"
            placeholderTextColor="#706D6D"
            style={{ color: "black" }}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {filteredLocations.length > 0 && (
          <FlatList
            data={filteredLocations}
            renderItem={renderLocationItem}
            keyExtractor={(item) => item.city}
            style={{ backgroundColor: '#FFFFFF', width: "50%", borderRadius: 10, paddingHorizontal: 10 }}
          />
        )}

        {/* {selectedLocation !== "" && (
          <Text style={{ marginTop: 10 }}>Selected Location: {selectedLocation}</Text>
        )} */}
      </View>
    </>
  );
};

export default Location;
