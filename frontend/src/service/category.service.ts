import { Backend } from "../common/http";
import { Service } from "../common/service";
import { Category } from "../types/category";
import { BaseResponse } from "../types/response";
import { endpoints } from "../common/config";

class CategoryService implements Service<Category, Category, number> {
    async create(data: Category): Promise<BaseResponse<Category>> {
        return await Backend.apply<Category>({
            ...endpoints.backendService.endpoints.category.add,
            data: data,
        });
    }
    async getAll(): Promise<BaseResponse<Category[] | null>> {
        let fakeData = {
            status: true,
            data: [
                {
                    id: 1,
                    title: "Home Appliances",
                    slug: "home-appliances",
                    children: [
                        {
                            id: 2,
                            title: "Kitchen Appliances",
                            slug: "kitchen-appliances",
                            children: [
                                {
                                    id: 3,
                                    title: "Microwaves",
                                    slug: "microwaves",
                                    children: [],
                                },
                                {
                                    id: 4,
                                    title: "Refrigerators",
                                    slug: "refrigerators",
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: 5,
                            title: "Laundry Appliances",
                            slug: "laundry-appliances",
                            children: [
                                {
                                    id: 6,
                                    title: "Washing Machines",
                                    slug: "washing-machines",
                                    children: [],
                                },
                                {
                                    id: 7,
                                    title: "Dryers",
                                    slug: "dryers",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 8,
                    title: "Electronics",
                    slug: "electronics",
                    children: [
                        {
                            id: 9,
                            title: "Mobile Phones",
                            slug: "mobile-phones",
                            children: [
                                {
                                    id: 10,
                                    title: "Smartphones",
                                    slug: "smartphones",
                                    children: [],
                                },
                                {
                                    id: 11,
                                    title: "Feature Phones",
                                    slug: "feature-phones",
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: 12,
                            title: "Computers",
                            slug: "computers",
                            children: [
                                {
                                    id: 13,
                                    title: "Laptops",
                                    slug: "laptops",
                                    children: [],
                                },
                                {
                                    id: 14,
                                    title: "Desktops",
                                    slug: "desktops",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 15,
                    title: "Fashion",
                    slug: "fashion",
                    children: [
                        {
                            id: 16,
                            title: "Men",
                            slug: "men",
                            children: [
                                {
                                    id: 17,
                                    title: "Clothing",
                                    slug: "clothing",
                                    children: [],
                                },
                                {
                                    id: 18,
                                    title: "Shoes",
                                    slug: "shoes",
                                    children: [],
                                },
                            ],
                        },
                        {
                            id: 19,
                            title: "Women",
                            slug: "women",
                            children: [
                                {
                                    id: 20,
                                    title: "Clothing",
                                    slug: "clothing",
                                    children: [],
                                },
                                {
                                    id: 21,
                                    title: "Shoes",
                                    slug: "shoes",
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    id: 22,
                    title: "Beauty & Health",
                    slug: "beauty-health",
                    children: [
                        {
                            id: 23,
                            title: "Skincare",
                            slug: "skincare",
                            children: [],
                        },
                        {
                            id: 24,
                            title: "Haircare",
                            slug: "haircare",
                            children: [],
                        },
                    ],
                },
                {
                    id: 25,
                    title: "Sports & Outdoors",
                    slug: "sports-outdoors",
                    children: [
                        {
                            id: 26,
                            title: "Exercise & Fitness",
                            slug: "exercise-fitness",
                            children: [],
                        },
                        {
                            id: 27,
                            title: "Outdoor Recreation",
                            slug: "outdoor-recreation",
                            children: [],
                        },
                    ],
                },
            ],
            message: "",
        };
        return fakeData;

        return await Backend.apply<Category[]>({
            ...endpoints.backendService.endpoints.category.getAll,
        });
    }
    async get(id: number): Promise<BaseResponse<Category | null>> {
        let fakeData = {
            status: true,
            data: {
                id: 3,
                title: "Microwaves",
                slug: "microwaves",
                children: [],
            },
            message: "",
        };
        return fakeData;

        return await Backend.applyAuthenticated<Category>({
            ...endpoints.backendService.endpoints.category.getSingle,
        });
    }
    async delete(id: number): Promise<BaseResponse<null>> {
        return await Backend.applyAuthenticated<null>({
            ...endpoints.backendService.endpoints.category.delete,
            url: endpoints.backendService.endpoints.category.delete.url.replace(
                "{id}",
                id.toString()
            ),
        });
    }
    async patch(id: number, data: Category): Promise<BaseResponse<null>> {
        return await Backend.applyAuthenticated<null>({
            ...endpoints.backendService.endpoints.category.update,
            url: endpoints.backendService.endpoints.category.update.url.replace(
                "{id}",
                id.toString()
            ),
            data,
        });
    }
}

export const categoryService = new CategoryService();
