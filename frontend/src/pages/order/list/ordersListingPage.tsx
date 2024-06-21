import { Modal, Select, Title } from "@mantine/core";

import { useState } from "react";
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
import { IconEdit, IconEye, IconTrash, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ProductBase } from "../../../types/product";
import { useDisclosure } from "@mantine/hooks";

const data: ProductBase[] = [
    {
        id: 1,
        title: "Iphone 14 Pro max",
        price: 2150,
        brand: "apple",
        category: ["electronics", "cellphone"],
    },
    {
        id: 2,
        title: "Iphone 15 Pro max",
        price: 2350,
        brand: "apple",
        category: ["electronics", "cellphone"],
    },
    {
        id: 3,
        title: "Iphone 13 Pro max",
        price: 950,
        brand: "apple",
        category: ["electronics", "cellphone"],
    },
    {
        id: 4,
        title: "Iphone 11 Pro max",
        price: 950,
        brand: "apple",
        category: ["electronics", "cellphone"],
    },
    {
        id: 5,
        title: "Iphone 13 Pro max",
        price: 1200,
        brand: "apple",
        category: ["electronics", "cellphone"],
    },
];

export default function OrdersListingPage() {
    const [activePage, setPage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [activeProduct, setActiveProduct] = useState<null | ProductBase>(
        null
    );
    const navigate = useNavigate();

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
                <Table.Td>{item.brand}</Table.Td>
                <Table.Td>
                    <Group>
                        {item.category.map((it) => (
                            <Badge color="orange" variant="light" key={it}>
                                {it}
                            </Badge>
                        ))}
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
                <span>Price: ${activeProduct?.price} </span>
                <br />
                <span>
                    status:
                    <Select data={["BOOKED", "DELIVERED", "SHIPPED"]}></Select>
                </span>
                {/* Modal content */}
            </Modal>
        </Container>
    );
}
