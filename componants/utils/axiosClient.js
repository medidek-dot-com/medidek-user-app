import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const axiosClient =axios.create({
    baseURL:"https://beyondblack.agency"
})

axiosClient.interceptors.request.use(async (request) => {
    const accessToken = await AsyncStorage.getItem("token");
    request.headers["Authorization"] = `Bearer ${accessToken}`;
    return request;
});
