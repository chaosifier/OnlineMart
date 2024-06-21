import { Button, Modal, Select } from "@mantine/core";

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
import { IconEye, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Product, ProductBase } from "../../../types/product";
import { useDisclosure } from "@mantine/hooks";
import { productService } from "../../../service/product.service";

export default function OrdersListingPage() {
    const [activePage, setPage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [data, setData] = useState<Product[]>([]);
    const [activeProduct, setActiveProduct] = useState<null | ProductBase>(
        null
    );
    const navigate = useNavigate();

    useEffect(() => {
        productService.getMyProducts().then((data) => {
            setData(data.data as Product[]);
        });
    }, []);

    const openStatusChangeModal = (id: number) => {
        const prod = data.filter((i) => i.id === id)[0];
        setActiveProduct(prod);
        open();
    };

    const closeStatusChangeModal = () => {
        close();
        setActiveProduct(null);
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
                            {item.category.slug}
                        </Badge>
                    </Group>
                </Table.Td>
                <Table.Td>
                    <Flex gap={rem(5)}>
                        <Badge color="orange" variant="light">
                            BOOKED
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
                    <Flex gap={rem(10)} justify={"center"}>
                        <Tooltip label="View">
                            <IconEye
                                onClick={() => navigate(`/orders/${item.id}`)}
                                cursor={"pointer"}
                            />
                        </Tooltip>
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
                <h1>Orders Listing Page</h1>
                <Search
                    placeholder="search orders"
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
                            <Table.Th>Status</Table.Th>
                            <Table.Th>Action</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>{rows}</Table.Tbody>
                </Table>
            </ScrollArea>
            <Flex justify={"center"} mt="md">
                <Pagination total={5} value={activePage} onChange={setPage} />
            </Flex>
            <Modal
                opened={opened}
                onClose={closeStatusChangeModal}
                title="Update Order Status"
            >
                <Flex direction="column" gap={rem(15)}>
                    <Text>Price: ${activeProduct?.price} </Text>

                    <Flex gap={rem(10)}>
                        <Text>status:</Text>
                        <Select
                            data={["BOOKED", "DELIVERED", "SHIPPED"]}
                        ></Select>
                    </Flex>

                    <Flex justify={"flex-end"}>
                        <Button> UPDATE STATUS </Button>
                    </Flex>
                </Flex>
            </Modal>
        </Container>
    );
}
