import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Searchdoctor from './Searchdoctor';
import SelectDoctor from './Selectdoctor';
import DoctorsProfile from './Doctorprofiledata';
import Conformation from './Conformation';
import AppointmentBookingforDoctor from './AppointmentBookingforDoctor';
const Stack = createNativeStackNavigator()
function StacknavigationForDoctor() {
    return  <Stack.Navigator initialRouteName='Searchdoctor' screenOptions={{
        headerShown:true,
        headerTitleAlign:"center"
    }} >
        <Stack.Screen name="Searchdoctor" component={Searchdoctor} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Find Doctor" }} />
        <Stack.Screen name="SelectDoctor" component={SelectDoctor}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Find Doctor" }} />
        <Stack.Screen name="DoctorsProfile" component={DoctorsProfile}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:" Doctors Profile" }} />

        <Stack.Screen name="Conformation" component={Conformation}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Confirmation" }} />
        <Stack.Screen name="AppointmentBookingforDoctor" component={AppointmentBookingforDoctor}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerTitle:"Book Appointment" }} />
      </Stack.Navigator>

  }


  export default StacknavigationForDoctor