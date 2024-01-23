import webConfigs from "../utils/web.config";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { backendUrl, headers } = webConfigs;

////////////////////////// Apis //////////////////////////
export const fetchBuildings = async (): Promise<{ success: boolean, buildings: Array<Object> }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/building/fetch`, {
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