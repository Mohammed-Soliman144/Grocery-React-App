// When import types or interface must use type keyword before interfaceName
import type IUserData from "./IUserData";

// Custom Hook To Handle Local Storage and save All Data of user inside in it
export const dataKey: string = 'UsersData';
export interface IAppData {
    // Set Data inside Local storage as array of object and each object contains specific one user data
    users: IUserData[];
};
