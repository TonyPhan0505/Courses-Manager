import webConfigs from "../utils/web.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { backendUrl, headers } = webConfigs;

////////////////////////// Apis //////////////////////////
export const fetchRooms = async (): Promise<{ success: boolean, rooms: Array<Object> }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/room/fetch`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
    return response;
};
/////////////////////////////////////////////////////////