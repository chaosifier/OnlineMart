export type STATUS = "AVAILABLE" | "OFFLINE";

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
