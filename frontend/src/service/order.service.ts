import { Backend } from "../common/http";
import { Service } from "../common/service";
import { ORDER_STATUS, OrderLineItem, Product } from "../types/product";
import { GenericResponse } from "../types/response";
import { endpoints } from "../common/config";

class OrderService implements Service<OrderLineItem, OrderLineItem, number> {
    async makeOrder() {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.order.create,
        });
    }
    async getCustomerOrder() {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.order.getCustomerOrders,
        });
    }
    async getSellerOrder() {
        return await Backend.applyAuthenticated<OrderLineItem[]>({
            ...endpoints.backendService.endpoints.order.getSellerOrders,
        });
    }

    async patchOrderLineItemStatus(
        id: number,
        status: ORDER_STATUS
    ): Promise<GenericResponse<Product>> {
        return await Backend.applyAuthenticated<Product>({
            ...endpoints.backendService.endpoints.product.update,
            url: endpoints.backendService.endpoints.order.updateLineItemStatus.url.replace(
                "{id}",
                id.toString()
            ),
            data: {
                status,
            },
        });
    }

    async create(
        data: OrderLineItem
    ): Promise<GenericResponse<Partial<OrderLineItem>>> {
        throw new Error("Method not implemented.");
    }
    async getAll(): Promise<GenericResponse<Partial<OrderLineItem>[]>> {
        return await Backend.apply<OrderLineItem[]>({
            ...endpoints.backendService.endpoints.product.getAll,
        });
    }
    async get(id: number): Promise<GenericResponse<OrderLineItem>> {
        throw new Error("Method not implemented.");
    }
    async delete(id: number): Promise<GenericResponse<null>> {
        throw new Error("Method not implemented.");
    }

    async patch(
        id: number,
        data: OrderLineItem
    ): Promise<GenericResponse<OrderLineItem>> {
        throw new Error("Method not implemented.");
    }
}

export const orderService = new OrderService();
