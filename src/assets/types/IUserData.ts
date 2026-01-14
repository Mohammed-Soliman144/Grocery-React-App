// When import types or interface must use type keyword before interfaceName
import type IProductData from "./IProductData"

// Interface Thats contains only user Object Data
export default interface IUserData {
        id: string,
        email: string,
        username?: string,
        pass?: string,
        currentVisit?: string,
        lastVisit?: string,
        VisitNo?: number,
        selectedProducts?: IProductData[],      
}


/* Note for this about typescript thinking

// Interface Thats contains only user Object Data
export default interface IUserData {
        id: string,
        username?: string,
        email?: string,
        pass?: string,
        isSignUp?: boolean,
        isSignIn?: boolean,
        currentVisit?: string,
        lastVisit?: string,
        VisitNo?: number,
        orderNo?: number

        // Here typescript deals with selectedProducts as tuple array with fixed one element length not as array of objects so must use selectedProducts?: IProductData[],   after import the interface to this file (note must use one export default per file)
        selectedProducts?: [{
            orderId?: string,
            prodName?: string,
            prodPrice?: string,
            prodImg?: string,
            prodQty?: number,
            purchaseDate?: string,
            orderItems?: number
        }],      
}


*/