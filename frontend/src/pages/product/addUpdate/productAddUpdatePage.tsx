import { Button, Flex, Select, TextInput, rem } from "@mantine/core";

import { useForm } from "@mantine/form";

import RichTextEditor from "../../../components/common/editor";
import { productService } from "../../../service/product.service";
import { BrandEntry, CategoryEntry, Product } from "../../../types/product";
import { useEffect, useState } from "react";
import { CenterPopLoader } from "../../../components/common/loader";
import { categoryService } from "../../../service/category.service";
import { brandService } from "../../../service/brand.service";

export default function ProductAddUpdatePage() {
    const [brands, setBrands] = useState<BrandEntry[] | null>(null);
    const [category, setCategory] = useState<CategoryEntry[] | null>(null);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            slug: "",
            title: "",
            price: "",
            stock: "",
            category_id: "",
            brand_id: "",
            description: "",
        },

        validate: {
            name: (value) =>
                value.trim().length < 3
                    ? "name must include at least 3 characters"
                    : null,
            slug: (value) =>
                value.length < 3
                    ? "slug must include at least 3 characters"
                    : null,
            title: (value) =>
                value.length < 3
                    ? "slug must include at least 3 characters"
                    : null,
            price: (value) =>
                value.length < 1
                    ? "price is required and should be positive number"
                    : null,
            stock: (value) =>
                value.length < 1
                    ? "stock is required and should be positive number"
                    : null,
            category_id: (value) =>
                value.length < 1 ? "category is required" : null,
            brand_id: (value) =>
                value.length < 1 ? "brand is required" : null,
            description: (value) =>
                value.length < 10
                    ? "description is required and should be at least 10 characters long"
                    : null,
        },
    });

    useEffect(() => {
        categoryService.getAll().then((data) => {
            if (data.success) {
                setCategory(data.data as CategoryEntry[]);
            }
        });
        brandService.getAll().then((data) => {
            if (data.success) {
                setBrands(data.data as BrandEntry[]);
            }
        });
    }, []);

    if (!brands || !category) {
        return <CenterPopLoader />;
    }

    const createProduct = () => {
        if (form.validate().hasErrors) {
            return;
        }
        const payload: Partial<Product> = {
            ...form.getValues(),
        } as unknown as Partial<Product>;

        productService.createProduct(payload).then((data) => {
            if (data.success) {
                form.reset();
            }
        });
    };
    return (
        <>
            <Flex direction={"column"} gap={rem(15)} px={rem(100)}>
                <h3>Create Product</h3>
                <TextInput
                    label="Name"
                    placeholder="name"
                    key={form.key("name")}
                    {...form.getInputProps("name")}
                />
                <TextInput
                    label="Slug"
                    placeholder="slug"
                    key={form.key("slug")}
                    {...form.getInputProps("slug")}
                />
                <TextInput
                    label="Title"
                    placeholder="title"
                    key={form.key("title")}
                    {...form.getInputProps("title")}
                />
                <TextInput
                    type="number"
                    label="Price"
                    placeholder="price"
                    key={form.key("price")}
                    {...form.getInputProps("price")}
                />

                <TextInput
                    type="number"
                    label="Stock"
                    placeholder="stock"
                    key={form.key("stock")}
                    {...form.getInputProps("stock")}
                />

                <Select
                    label="Category"
                    placeholder="Pick a Category"
                    data={
                        category
                            ? category.map((it) => {
                                  return {
                                      label: it.slug,
                                      value: it.id.toString(),
                                  };
                              })
                            : []
                    }
                    searchable
                    clearable
                    nothingFoundMessage="Not found"
                    key={form.key("category_id")}
                    {...form.getInputProps("category_id")}
                />

                <Select
                    label="Brand"
                    placeholder="Pick a brand"
                    data={
                        brands
                            ? brands.map((it) => {
                                  return {
                                      label: it.name,
                                      value: it.id.toString(),
                                  };
                              })
                            : []
                    }
                    searchable
                    clearable
                    nothingFoundMessage="Not found"
                    key={form.key("brand_id")}
                    {...form.getInputProps("brand_id")}
                />

                <RichTextEditor
                    placeholder="Product Description..."
                    label="Description"
                    key={form.key("description")}
                    {...form.getInputProps("description")}
                />
            </Flex>
            <Flex justify={"center"} mt={rem(15)}>
                <Button variant="default" onClick={createProduct}>
                    SAVE
                </Button>
            </Flex>
        </>
    );
}
