export type STATUS = "AVAILABLE" | "OFFLINE";
export type ORDER_STATUS =
    | "PENDING"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED"
    | "RETURN_REQUEST"
    | "RETURN_PROCESSING"
    | "RETURNED";

type BrandEntry = {
    id: number;
    name: string;
};

type CategoryEntry = {
    id: number;
    title: string;
    slug: string;
};

type ImageEntry = { id: number; title: string; path: string };
type SellerEntry = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
};

export type ProductBase = {
    id: number;
    title: string;
    price: number;
    category: CategoryEntry;
    brand: BrandEntry;
};

export type Product = ProductBase & {
    slug: string;
    description: string;
    stock: number;
    images: ImageEntry[];
    seller: SellerEntry;
    status: STATUS;
};

export type OrderLineItem = {
    id: number;
    quantity: number;
    taxAmount: number;
    totalPrice: number;
    unitPrice: number;
    product: Product;
    status: ORDER_STATUS;
};
