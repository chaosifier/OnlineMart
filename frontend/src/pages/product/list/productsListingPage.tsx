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
} from "@mantine/core";
import Search from "../../../components/common/search";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../types/product";
import { productService } from "../../../service/product.service";

export default function ProductsListingPage() {
    const [activePage, setPage] = useState(1);
    const navigate = useNavigate();

    const [data, setData] = useState<Product[]>([]);

    useEffect(() => {
        productService.getMyProducts().then((data) => {
            setData(data.data as Product[]);
        });
    }, []);

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
                    <Group>
                        <Badge color="orange" variant="light">
                            {item.category.title}
                        </Badge>
                    </Group>
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

    const search = (c: string) => {
        console.log({ c });
    };

    return (
        <Container my="lg">
            <Flex align={"center"} justify={"space-between"}>
                <h1>Product Listing Page</h1>
                <Search
                    placeholder="search products"
                    onDebounce={search}
                    disableRightSection={true}
                />
            </Flex>

            <ScrollArea>
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
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
            <Flex justify={"center"} mt="md">
                <Pagination total={5} value={activePage} onChange={setPage} />
            </Flex>
        </Container>
    );
}
