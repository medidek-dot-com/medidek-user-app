import { ImageBackground, Text, View ,TextInput ,TouchableOpacity ,Alert } from "react-native"

import {useState} from "react"
import { axiosClient } from "../../utils/axiosClient"
import { useNavigation } from "@react-navigation/native"



const ResetPassword =({ route })=>{
  const {id}=route.params
  const navigate=useNavigation()
  const [updatedPassword,setUpDatedPassword]=useState({newPassword:"",AgainNewPassword:""})

  const NewPassword= async()=>{
    try {
      if(updatedPassword.newPassword!==updatedPassword.AgainNewPassword){
      
        return Alert.alert(" Password is not Match")
        }
    
        const result= await axiosClient.put(`ResetPassword/${id}`,{password:updatedPassword.newPassword})
        console.log(result.data.statusCode);
        if(result.data.statusCode===201){
               
         Alert.alert(" Password reset Successfully")
          navigate.navigate("loginWithEmail")
        }
    } catch (error) {
      Alert.alert(error)
    }
  }
    return <View style={{flex:1,paddingHorizontal:16}}>
        <ImageBackground
         source={require('../../Assets/BackgroundImg.png')} resizeMode="cover" style={{ width: "100%", height: "100%" ,justifyContent:"center",alignItems:"center" }} >
              <View style={{backgroundColor:"#1F51C6",width:"100%",paddingHorizontal:30,paddingVertical:32,borderRadius:10,gap:10}}>
<View><Text style={{textAlign:"center",fontWeight:"700",fontSize:24,color:"#FFFFFF"}}>Reset Password?</Text></View>
            <TextInput
            style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF" }}
            placeholder="Enter New Password"
            placeholderTextColor="#FFFFFF"
            onChangeText={(e)=>setUpDatedPassword({...updatedPassword,newPassword:e})}
          />
          <TextInput
            style={{ borderBottomWidth: 1, borderBottomColor: "#FFFFFF" }}
            placeholder="Enter Password Again"
            placeholderTextColor="#FFFFFF"
            onChangeText={(e)=>setUpDatedPassword({...updatedPassword,AgainNewPassword:e})}
          />
             <TouchableOpacity
          style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            paddingVertical: 10,
            borderRadius: 25,
            alignItems: "center",
            
          }}
          onPress={NewPassword}
        >
          <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>continue</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>
      
    </View>
}

export default ResetPassword