import { useEffect, useState } from "react";
import {
    Table,
    ScrollArea,
    Text,
    rem,
    Container,
    Flex,
    Group,
    Badge,
    Pagination,
    Tooltip,
    Modal,
    Select,
    Button,
    Center,
} from "@mantine/core";
import Search from "../../../components/common/search";
import { IconEye, IconPencil, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Product, STATUS } from "../../../types/product";
import { productService } from "../../../service/product.service";
import { useDisclosure } from "@mantine/hooks";
import { CenterPopLoader } from "../../../components/common/loader";

export default function ProductsListingPage() {
    const [activePage, setPage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [activeProduct, setActiveProduct] = useState<null | Product>(null);
    const [productStatus, setProductStatus] = useState<STATUS | null>(null);

    const navigate = useNavigate();

    const [data, setData] = useState<Product[] | null>(null);

    useEffect(() => {
        productService.getMyProducts().then((data) => {
            setData(data.data as Product[]);
        });
    }, []);

    if (!data) {
        return <CenterPopLoader />;
    }

    const openStatusChangeModal = (id: number) => {
        const prod = data.filter((i) => i.id === id)[0];
        setActiveProduct(prod);
        setProductStatus(prod.status);
        open();
    };

    const closeStatusChangeModal = () => {
        close();
        setActiveProduct(null);
        setActiveProduct(null);
    };

    const search = (c: string) => {
        console.log({ c });
    };

    const updateProductStatus = () => {
        if (activeProduct && productStatus) {
            productService
                .patchProductStatus(activeProduct.id, productStatus)
                .then((d) => {
                    activeProduct.status = productStatus;
                    closeStatusChangeModal();
                });
        }
    };

    const handleProductDeletion = (id: number) => {
        // run delete function
    };

    const rows = data.map((item) => {
        return (
            <Table.Tr key={item.id}>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item.title}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>${item.price}</Table.Td>
                <Table.Td>{item.brand.name}</Table.Td>
                <Table.Td>
                    <Badge color="orange" variant="light">
                        {item.category.title}
                    </Badge>
                </Table.Td>
                <Table.Td>
                    <Flex gap={rem(5)}>
                        <Badge color="orange" variant="light">
                            {item.status}
                        </Badge>
                        <Tooltip label="update status">
                            <IconPencil
                                size={15}
                                onClick={() => openStatusChangeModal(item.id)}
                                cursor={"pointer"}
                            />
                        </Tooltip>
                    </Flex>
                </Table.Td>
                <Table.Td>
                    <Flex gap={rem(10)}>
                        <Tooltip label="View">
                            <IconEye
                                onClick={() => navigate(`/products/${item.id}`)}
                                cursor={"pointer"}
                            />
                        </Tooltip>
                        <Tooltip label="Delete">
                            <IconTrash
                                onClick={() => handleProductDeletion(item.id)}
                                cursor={"pointer"}
                            />
                        </Tooltip>
                        {/* <Tooltip label="Edit">
                            <IconEdit
                                onClick={() =>
                                    navigate(
                                        `/seller/products/update/${item.id}`
                                    )
                                }
                                cursor={"pointer"}
                            />
                        </Tooltip> */}
                    </Flex>
                </Table.Td>
            </Table.Tr>
        );
    });

    return (
        <Container my="lg">
            <Flex align={"center"} justify={"space-between"}>
                <h1>Product Listing Page</h1>
                {data.length > 0 && (
                    <Search
                        placeholder="search products"
                        onDebounce={search}
                        disableRightSection={true}
                    />
                )}
            </Flex>

            <ScrollArea>
                {data.length > 0 ? (
                    <Table
                        miw={800}
                        verticalSpacing="sm"
                        striped
                        highlightOnHover
                        withTableBorder
                        withColumnBorders
                    >
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Price</Table.Th>
                                <Table.Th>Brand</Table.Th>
                                <Table.Th>Category</Table.Th>
                                <Table.Th>Status</Table.Th>
                                <Table.Th>Action</Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{rows}</Table.Tbody>
                    </Table>
                ) : (
                    <Center>
                        <h3>No Orders Found</h3>
                    </Center>
                )}
            </ScrollArea>
            {data.length > 0 && (
                <Flex justify={"center"} mt="md">
                    <Pagination
                        total={5}
                        value={activePage}
                        onChange={setPage}
                    />
                </Flex>
            )}
            <Modal
                opened={opened}
                onClose={closeStatusChangeModal}
                title="Update Product Status"
            >
                <Flex direction="column" gap={rem(15)}>
                    <Text>Name: {activeProduct?.title} </Text>

                    <Flex gap={rem(10)}>
                        <Text>status:</Text>
                        <Select
                            value={productStatus}
                            data={["OFFLINE", "AVAILABLE"]}
                            allowDeselect={false}
                            onChange={(e) => {
                                if (e) {
                                    setProductStatus(e as STATUS);
                                }
                            }}
                        ></Select>
                    </Flex>

                    <Flex justify={"flex-end"}>
                        <Button onClick={updateProductStatus}>
                            UPDATE STATUS
                        </Button>
                    </Flex>
                </Flex>
            </Modal>
        </Container>
    );
}
