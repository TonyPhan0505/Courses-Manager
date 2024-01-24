import webConfigs from "../utils/web.config";
const { backendUrl, headers } = webConfigs;

////////////////////////// Apis //////////////////////////
export const userLogin = async (username: string, password: string): Promise<{ success: boolean, accessToken: string }> => {
    const data = {
        username: username,
        password: password
    };
    const response: any = await fetch(`${backendUrl}/user/login`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data)
    }).then(
        (res) => {
            return res.json();
        }
    ).catch(
        err => {
            console.log(err);
        }
    );
    return response;
};

export const fetchUsers = async (): Promise<{ success: boolean, users: Array<Object> }> => {
    const response: any = await fetch(`${backendUrl}/user/fetch`, {
        method: 'GET',
        headers: headers
    }).then(
        res => {
            return res.json();
        }
    ).catch(
        err => {
            console.log(err);
        }
    );
    return response;
};
///////////////////////////////////////////////////////