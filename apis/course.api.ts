import webConfigs from "../utils/web.config";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { backendUrl, headers } = webConfigs;

////////////////////////// Apis //////////////////////////
export const fetchCourses = async (): Promise<{ success: boolean, courses: Array<Object> }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/course/fetch`, {
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

export const createCourse = async (newCourse: Object): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        newCourse: newCourse,
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/course/create`, {
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

export const editCourse = async (updatedCourse: Object): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    const data = {
        updatedCourse: updatedCourse,
        accessToken: accessToken
    };
    const response: any = await fetch(`${backendUrl}/course/edit`, {
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

export const deleteCourse = async (courseId: string): Promise<{ success: boolean }> => {
    const accessToken = await AsyncStorage.getItem('accessToken');
    let data = {
        courseId: courseId,
        accessToken: accessToken
    }
    const response: any = await fetch(`${backendUrl}/course/delete`, {
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