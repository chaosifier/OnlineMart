export type STATUS = "AVAILABLE" | "OFFLINE";

export type ProductBase = {
    id: number;
    title: string;
    price: number;
    category: string[];
    brand: string;
};

export type Product = ProductBase & {
    slug: string;
    description: string;
    stock: number;
    images: { id: number; title: string; path: string }[];
    seller: { id: number; firstName: string; lastName: string; email: string };
    status: STATUS;
};
