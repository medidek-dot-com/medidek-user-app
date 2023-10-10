import { ImageBackground, Text, View ,TextInput ,TouchableOpacity } from "react-native"
import { axiosClient } from "../../utils/axiosClient"
import { useState } from "react"
import { useRecoilState } from "recoil"
import { UserEmailForResetThePassword } from "../../Recoil/Atom"





const ForgotPassword =(props)=>{
  const [userEmail,setUserEmail]=useState({email:""})
  const [UserEmailForTheResetPassword,setUserEmailForTheResetPassword]=useRecoilState(UserEmailForResetThePassword)
  console.log(userEmail);

  // props.navigation.navigate("ForgotPasswordOtpverification")
  const sendOtp=async()=>{
    const result=await axiosClient.post("sendOtpForResetPassword",userEmail)
    console.log("click");
    console.log(result.data.result._id);
    if(result.data.statusCode===200){
      setUserEmailForTheResetPassword(userEmail.email)
       props.navigation.navigate("ForgotPasswordOtpverification",{id:result.data.result._id})
    }
  }
    return <View style={{flex:1,paddingHorizontal:16}}>
        <ImageBackground
         source={require('../../Assets/BackgroundImg.png')} resizeMode="cover" style={{ width: "100%", height: "100%" ,justifyContent:"center",alignItems:"center" }} >
              <View style={{backgroundColor:"#1F51C6",width:"100%",paddingHorizontal:30,paddingVertical:32,borderRadius:10,gap:10}}>
<View><Text style={{textAlign:"center",fontWeight:"700",fontSize:24,color:"#FFFFFF"}}>Forgot Password?</Text>
            <Text style={{textAlign:"center",fontSize:12,color:"#FFFFFF"}}>Please enter your Mobile number so we can send you a verification code</Text></View>
            <TextInput
            style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF" }}
            placeholder="Email"
            placeholderTextColor="#FFFFFF"
            onChangeText={(e)=>{setUserEmail({...userEmail,email:e})}}
          />
             <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: "center",
            
          }}
          onPress={sendOtp}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      
    </View>
}

export default ForgotPassword