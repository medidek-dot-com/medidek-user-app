import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dashbord from './Dashbord';
import CompletedAppointment from './CompletedAppointment';
import CancelAppointment from './CancelAppointment';

const Tab = createMaterialTopTabNavigator();

function DashboardTopTabNavigation() {
  return (
    <Tab.Navigator   screenOptions={{
      tabBarLabelStyle: { fontSize: 13,fontWeight:"500" },
      tabBarActiveTintColor: '#1F51C6',
      tabBarInactiveTintColor: '#706D6D',
     
    }}>
      <Tab.Screen name="UpcomingAppointment" component={Dashbord} options={{title:"Upcoming"}} />
      <Tab.Screen name="CompletedAppointment" component={CompletedAppointment} options={{title:"Completed"}} />
      <Tab.Screen name="CancelAppointment" component={CancelAppointment}      options={{title:"Cancelled"}}  />
    </Tab.Navigator>
  );
}

export default DashboardTopTabNavigation