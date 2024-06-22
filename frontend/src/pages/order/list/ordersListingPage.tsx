import { ActionIcon, Button, Modal, Select } from "@mantine/core";

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
import { ORDER_STATUS, OrderLineItem } from "../../../types/product";
import { useDisclosure } from "@mantine/hooks";
import { orderService } from "../../../service/order.service";
import { CenterPopLoader } from "../../../components/common/loader";

export default function OrdersListingPage() {
    const [activePage, setPage] = useState(1);
    const [opened, { open, close }] = useDisclosure(false);
    const [data, setData] = useState<OrderLineItem[] | null>(null);
    const [activeProduct, setActiveProduct] = useState<null | OrderLineItem>(
        null
    );
    const [productLineStatus, setProductLineStatus] =
        useState<ORDER_STATUS | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        orderService.getSellerOrder().then((data) => {
            setData(data.data as OrderLineItem[]);
        });
    }, []);

    const closeStatusChangeModal = () => {
        close();
        setActiveProduct(null);
    };

    if (!data) {
        return <CenterPopLoader />;
    }

    const openStatusChangeModal = (id: number) => {
        const prod = data.filter((i) => i.id === id)[0];
        setProductLineStatus(prod.status);
        setActiveProduct(prod);
        open();
    };

    const updateProductOrderLineStatus = () => {
        if (activeProduct && productLineStatus) {
            orderService
                .patchOrderLineItemStatus(activeProduct.id, productLineStatus)
                .then((d) => {
                    activeProduct.status = productLineStatus;
                    closeStatusChangeModal();
                });
        }
    };

    const rows = data.map((item) => {
        return (
            <Table.Tr key={item.id}>
                <Table.Td>
                    <Group gap="sm">
                        <Text size="sm" fw={500}>
                            {item.product.slug}
                        </Text>
                    </Group>
                </Table.Td>
                <Table.Td>{item.quantity}</Table.Td>
                <Table.Td>${item.unitPrice}</Table.Td>
                <Table.Td>${item.taxAmount}</Table.Td>
                <Table.Td>${item.totalPrice}</Table.Td>
                <Table.Td>
                    <Group>
                        <Badge color="orange" variant="light">
                            {item.product.category.slug}
                        </Badge>
                    </Group>
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
                    <Flex gap={rem(10)} justify={"center"}>
                        <Tooltip label="View">
                            <IconEye
                                onClick={() =>
                                    navigate(`/products/${item.product.id}`)
                                }
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
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Unit Price</Table.Th>
                            <Table.Th>Tax Amount</Table.Th>
                            <Table.Th>Total</Table.Th>
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
                    <Text>Name: {activeProduct?.product.slug} </Text>

                    <Flex gap={rem(10)}>
                        <Text>status:</Text>
                        <Select
                            value={productLineStatus}
                            data={[
                                "PENDING",
                                "PROCESSING",
                                "SHIPPED",
                                "DELIVERED",
                                "CANCELLED",
                                "RETURN_REQUEST",
                                "RETURN_PROCESSING",
                                "RETURNED",
                            ]}
                            allowDeselect={false}
                            onChange={(e) => {
                                if (e) {
                                    setProductLineStatus(e as ORDER_STATUS);
                                }
                            }}
                        ></Select>
                    </Flex>

                    <Flex justify={"flex-end"}>
                        <Button onClick={updateProductOrderLineStatus}>
                            {" "}
                            UPDATE STATUS{" "}
                        </Button>
                    </Flex>
                </Flex>
            </Modal>
        </Container>
    );
}
