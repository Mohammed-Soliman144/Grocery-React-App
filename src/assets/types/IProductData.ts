// One User Can purchase or selected many of products and each product is array of object
export default interface IProductData {
    orderId: string,
    prodId?: string,
    prodName?: string,
    prodPrice?: string,
    prodImg?: string,
    prodQty?: number,
    purchaseDate?: string,
}