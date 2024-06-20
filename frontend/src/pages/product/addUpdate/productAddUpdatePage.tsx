import { Button, Flex, Select, TextInput, rem } from "@mantine/core";

import { useForm } from "@mantine/form";
// import { useState } from "react";
import RichTextEditor from "../../../components/common/editor";

export default function ProductAddUpdatePage() {
    // const [active, setActive] = useState(0);

    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            name: "",
            slug: "",
            title: "",
            price: "",
            stock: "",
            category: "",
            brand: "",
            description: "",
        },
        validate: (values) => {
            return {
                name:
                    values.name.trim().length < 3
                        ? "name must include at least 3 characters"
                        : null,
                slug:
                    values.slug.length < 3
                        ? "slug must include at least 3 characters"
                        : null,
                title:
                    values.title.length < 3
                        ? "slug must include at least 3 characters"
                        : null,
                price:
                    values.price.length < 1
                        ? "price is required and should be positive number"
                        : null,
                stock:
                    values.stock.length < 1
                        ? "stock is required and should be positive number"
                        : null,
                category:
                    values.category.length < 1 ? "category is required" : null,
                brand: values.brand.length < 3 ? "brand is required" : null,
                description:
                    values.description.length < 10
                        ? "description is required and should be at least 10 characters long"
                        : null,
            };
        },
        // validate: (values) => {
        //     if (active === 0) {
        //         return {
        //             name:
        //                 values.name.trim().length < 3
        //                     ? "name must include at least 3 characters"
        //                     : null,
        //             slug:
        //                 values.slug.length < 3
        //                     ? "slug must include at least 3 characters"
        //                     : null,
        //             title:
        //                 values.title.length < 3
        //                     ? "slug must include at least 3 characters"
        //                     : null,
        //             price:
        //                 values.price.length < 1
        //                     ? "price is required and should be positive number"
        //                     : null,
        //             stock:
        //                 values.stock.length < 1
        //                     ? "stock is required and should be positive number"
        //                     : null,
        //             category:
        //                 values.category.length < 1
        //                     ? "category is required"
        //                     : null,
        //             brand: values.brand.length < 3 ? "brand is required" : null,
        //             description:
        //                 values.description.length < 10
        //                     ? "description is required and should be at least 10 characters long"
        //                     : null,
        //         };
        //     }

        //     // if (active === 2) {
        //     //     return {};
        //     // }

        //     // if (active === 2) {
        //     //     return {};
        //     // }

        //     return {};
        // },
    });

    // const prevStep = () =>
    //     setActive((current) => (current > 0 ? current - 1 : current));

    // const nextStep = () => {
    //     setActive((current) => {
    //         if (form.validate().hasErrors) {
    //             return current;
    //         }
    //         return current < 3 ? current + 1 : current;
    //     });
    //     console.log({ values: form.getValues() });
    // };

    const createProduct = () => {
        if (form.validate().hasErrors) {
            return;
        }
        console.log({ values: form.getValues() });
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
                    label="Categories"
                    placeholder="Pick Categories"
                    data={[
                        { label: "React", value: "1" },
                        { label: "Angular", value: "2" },
                        { label: "Vue", value: "3" },
                        { label: "Svelte", value: "4" },
                    ]}
                    searchable
                    clearable
                    nothingFoundMessage="Nothing found..."
                    key={form.key("category")}
                    {...form.getInputProps("category")}
                />

                <TextInput
                    label="Brand"
                    placeholder="brand"
                    key={form.key("brand")}
                    {...form.getInputProps("brand")}
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

    // return (
    //     <>
    //         <Stepper
    //             active={active}
    //             onStepClick={setActive}
    //             allowNextStepsSelect={false}
    //         >
    //             <Stepper.Step
    //                 label="First step"
    //                 description="Create an account"
    //             >
    //                 <Flex direction={"column"} gap={rem(15)} px={rem(100)}>
    //                     <TextInput
    //                         label="name"
    //                         placeholder="name"
    //                         key={form.key("name")}
    //                         {...form.getInputProps("name")}
    //                     />
    //                     <TextInput
    //                         label="slug"
    //                         placeholder="slug"
    //                         key={form.key("slug")}
    //                         {...form.getInputProps("slug")}
    //                     />
    //                     <TextInput
    //                         label="title"
    //                         placeholder="title"
    //                         key={form.key("title")}
    //                         {...form.getInputProps("title")}
    //                     />
    //                     <TextInput
    //                         type="number"
    //                         label="price"
    //                         placeholder="price"
    //                         key={form.key("price")}
    //                         {...form.getInputProps("price")}
    //                     />

    //                     <TextInput
    //                         type="number"
    //                         label="stock"
    //                         placeholder="stock"
    //                         key={form.key("stock")}
    //                         {...form.getInputProps("stock")}
    //                     />

    //                     <Select
    //                         label="Categories"
    //                         placeholder="Pick Categories"
    //                         data={[
    //                             { label: "React", value: "1" },
    //                             { label: "Angular", value: "2" },
    //                             { label: "Vue", value: "3" },
    //                             { label: "Svelte", value: "4" },
    //                         ]}
    //                         searchable
    //                         clearable
    //                         nothingFoundMessage="Nothing found..."
    //                         key={form.key("category")}
    //                         {...form.getInputProps("category")}
    //                     />

    //                     <TextInput
    //                         label="brand"
    //                         placeholder="brand"
    //                         key={form.key("brand")}
    //                         {...form.getInputProps("brand")}
    //                     />

    //                     <RichTextEditor
    //                         placeholder="Product Description..."
    //                         label="description"
    //                         key={form.key("description")}
    //                         {...form.getInputProps("description")}
    //                     />
    //                 </Flex>
    //             </Stepper.Step>

    //             <Stepper.Step label="Second step" description="Verify email">
    //                 Step 2 content: Verify email
    //             </Stepper.Step>
    //             <Stepper.Step label="Final step" description="Get full access">
    //                 Step 3 content: Get full access
    //             </Stepper.Step>
    //             <Stepper.Completed>
    //                 Completed, click back button to get to previous step
    //             </Stepper.Completed>
    //         </Stepper>

    //         <Group justify="flex-end" mt="xl">
    //             {active !== 0 && (
    //                 <Button variant="default" onClick={prevStep}>
    //                     Back
    //                 </Button>
    //             )}
    //             {active !== 3 && <Button onClick={nextStep}>Next step</Button>}
    //         </Group>
    //     </>
    // );
}
