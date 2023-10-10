
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, KeyboardAvoidingView, StatusBar, Text } from "react-native"
import StacknavigationForDoctor from '../Doctors/StacknavigationForDoctor';
import Reports from '../Record/Reports';
import HomePageStacknavigation from '../Home/HomepageStacknavigation';
import DashboardTopTabNavigation from '../Dashbord/TopTabnavigationforDashbord';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Tab = createBottomTabNavigator();

const Main = () => {
  const navigation =useNavigation()
  useFocusEffect(
    useCallback(() => {
      // Function to check if the user is logged in by verifying the presence of a token
      const checkUserLogin = async () => {
        try {
          // Retrieve the token from AsyncStorage
          const userToken = await AsyncStorage.getItem('token');

          // If the token is present, the user is logged in
          if (userToken) {
            // You can perform any additional actions here if needed
          } else {
            // The user is not logged in, you can navigate to the login screen or take other actions
            console.log('User is not logged in');
            navigation.navigate("createAccountpage")
            // Example: Navigate to the login screen
            // props.navigation.navigate('Login');
          }
        } catch (error) {
          console.error('Error checking user login:', error);
        }
      };

      // Call the function to check user login status when the component is focused
      checkUserLogin();
    }, [])
  );
  return (
    <>
  <StatusBar backgroundColor="#1F51C6" barStyle="light-content"/>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Home") {
                iconName = focused
                  ? require("../Assets/Home-active-icon.png")
                  : require("../Assets/home-inactive-icon.png");
              } else if (route.name === "Doctors") {
                iconName = focused
                  ? require("../Assets/Capsule-inactive-icon.png")
                  : require("../Assets/Capsule-inactive-icon.png"); // You can provide an empty image for the inactive state
              }

              else if (route.name === "Dashbord") {
                iconName = focused
                  ? require("../Assets/Dashboard-active-icon.png")
                  : require("../Assets/Dashboard-inactive-icon.png"); // You can provide an empty image for the inactive state
              }

              else if (route.name === "Records") {
                iconName = focused
                  ? require("../Assets/Records-active-icon.png")
                  : require("../Assets/Record-inactive-icon.png"); // You can provide an empty image for the inactive state
              }
              // You can return any component that you like here!
              return    <Image
              source={iconName}
              style={{ width: 20, height: 20, tintColor: color }}
            />
            },
            tabBarActiveTintColor: '#1F51C6',
            // tabBarInactiveTintColor: 'gray',
            tabBarHideOnKeyboard: true  ,
            headerTitleAlign:"center"
          
          })}
        >
          <Tab.Screen name="Home" component={HomePageStacknavigation} options={{ headerShown: false }} />
          {/* options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} */}
          <Tab.Screen name="Doctors" component={StacknavigationForDoctor} options={{headerShown:false,unmountOnBlur:true }} />
          <Tab.Screen name="Dashbord" component={DashboardTopTabNavigation} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Appointment Tracking",tabBarLabel:"Tracking" }} />
          <Tab.Screen name="Records" component={Reports} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
        </Tab.Navigator>     
 
     </>
  )
}

export default Main