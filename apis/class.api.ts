import webConfigs from "../utils/web.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { backendUrl, headers } = webConfigs;

////////////////////////// Apis //////////////////////////
export const fetchClasses = async (): Promise<{ success: boolean, classes: Array<Object> }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/class/fetch`, {
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

export const createClass = async (newClass: Object): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        newClass: newClass,
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/class/create`, {
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

export const editClass = async (updatedClass: Object): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        updatedClass: updatedClass,
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/class/edit`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(data)
    }).then(res => {
        return res.json();
    }).catch(err => {
        console.log(err);
    });
    return response;
};

export const deleteClass = async (classId: string): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        classId: classId,
        accessToken: accessToken
    }
    const response: any = await fetch(`${backendUrl}/class/delete`, {
        method: 'DELETE',
        headers: headers,
        body: JSON.stringify(data)
    }).then(res => { 
        return res.json(); 
    }).catch(err => {
        console.log(err);
    });
    return response;
};

export const deleteCascadeClass = async (courseId: string): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        courseId: courseId,
        accessToken: accessToken
    }
    const response: any = await fetch(`${backendUrl}/class/deleteCascade`, {
        method: 'DELETE',
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