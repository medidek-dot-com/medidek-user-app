

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../tabnavigation/Main';
import { NavigationContainer } from '@react-navigation/native';
import EditProfileUser from '../Stacknavigation/EditProfileUser';
import Profile from './Profilepage';
import OnBoardingPage from './Onboardingpage';
import OnBoardingSlied from './OnboardingSlied';
import CreateAccountpage from './Account/CreateAccountpage';
import LoginWithNumber from './WelcomeScreen/LoginWithNumber';
import LoginWithEmail from './WelcomeScreen/LoginWithEmail';
import Otpverification from './WelcomeScreen/OtpVerification';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import ForgotPasswordOtpverification from './ForgotPassword/ForgotPasswordOtpverification';
import ResetPassword from './ForgotPassword/ResetPassword';
import UploadRecord from '../Record/UploadRecord';
import RescheduleAppointment from './ResheduleAppointment/ResheduleAppointment';
const Stack = createNativeStackNavigator()

const HomePageStacknavigation = () => {

  return (
    <>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false,orientation:"portrait" }} initialRouteName='onBoardPage' >
        <Stack.Screen name="onBoardPage" component={OnBoardingPage} />
        <Stack.Screen name="Slidingpages" component={OnBoardingSlied} />
          <Stack.Screen name="createAccountpage" component={CreateAccountpage} />
          <Stack.Screen name="loginWithEmail" component={LoginWithEmail} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
          <Stack.Screen name="loginWithNumber" component={LoginWithNumber} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white" }} />
          <Stack.Screen name="tabbord" component={Main} />
       
          <Stack.Screen name="EditProfile" component={EditProfileUser} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: true }} />
          {/* <Stack.Screen name="Editprofile" component={EditProfileUser} /> */}

          <Stack.Screen name="Profile" component={Profile} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: true ,headerTitleAlign:"center" }} />
          <Stack.Screen name="Otpverification" component={Otpverification} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
          {/* <Stack.Screen name="ChangePassword" component={ChangePassword}         options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white",headerShown:true }} /> */}
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
          <Stack.Screen name="ForgotPasswordOtpverification" component={ForgotPasswordOtpverification} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
          <Stack.Screen name="ResetPassword" component={ResetPassword} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
          <Stack.Screen name="ResheduleAppointment" component={RescheduleAppointment} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
          <Stack.Screen name="UploadRecord" component={UploadRecord} options={{ headerStyle: { backgroundColor: "#1F51C6" }, headerTintColor: "white", headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>


    </>
  )
}

export default HomePageStacknavigation