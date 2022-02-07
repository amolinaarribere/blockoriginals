export const privatePoolKey = 'privatePool';
export const providerKey = 'provider';
export const accountConnectedKey = 'accountConnected';
export const currentTabKey = 'currentTab';


export function ReadKey(key){
    return sessionStorage.getItem(key);
}

export function WriteKey(key, value){
    return sessionStorage.setItem(key, value, { path: '/' });
}

