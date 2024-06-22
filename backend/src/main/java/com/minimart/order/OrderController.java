package com.minimart.order;

import com.minimart.auth.AuthDetails;
import com.minimart.common.ApiResponse;
import com.minimart.common.ResponseMeta;
import com.minimart.common.dto.PaginationDto;
import com.minimart.order.dto.request.ChangeOrderLineStatusDto;
import com.minimart.order.dto.request.ChangeOrderStatusDto;
import com.minimart.order.dto.response.OrderLineItemResponseDto;
import com.minimart.order.dto.response.OrderResponseDto;
import com.minimart.order.entity.OrderLineStatus;
import com.minimart.order.entity.OrderStatus;
import com.minimart.product.dto.response.ProductResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PreAuthorize("hasAnyAuthority('CUSTOMER')")
    @PostMapping
    public ApiResponse<OrderResponseDto> createOrder(@AuthenticationPrincipal AuthDetails authDetails) throws Exception {
        OrderResponseDto newOrder = orderService.addOrder(authDetails.getId());
        return ApiResponse.success(newOrder, "Order created successfully");
    }

    @GetMapping
    public ApiResponse<List<OrderResponseDto>> getAllOrders(PaginationDto paginationDto, @AuthenticationPrincipal AuthDetails authDetails) {
        Page<OrderResponseDto> orders = orderService.findAll(paginationDto, authDetails.getId());
        return ApiResponse.success(
                orders.getContent(),
                "Orders fetched successfully",
                new ResponseMeta(
                        orders.getNumber(),
                        orders.getSize(),
                        orders.getTotalElements(),
                        orders.getTotalPages())
        );

    }

    @PreAuthorize("hasAnyAuthority('SELLER')")
    @GetMapping("/seller")
    public ApiResponse<List<OrderLineItemResponseDto>> getMyOrders(PaginationDto paginationDto, @AuthenticationPrincipal AuthDetails authDetails) {
        Page<OrderLineItemResponseDto> orders = orderService.findSellerOrders(paginationDto, authDetails.getId());
        return ApiResponse.success(
                orders.getContent(),
                "Ordered products fetched successfully",
                new ResponseMeta(
                        orders.getNumber(),
                        orders.getSize(),
                        orders.getTotalElements(),
                        orders.getTotalPages())
        );

    }

//    @PreAuthorize("hasAnyAuthority('ADMIN') || hasAnyAuthority('SELLER')")
    @PatchMapping("/{id}")
    public ApiResponse<OrderResponseDto>  changeStatus(@RequestBody ChangeOrderStatusDto changeOrderStatusDto, @PathVariable int id) throws Exception {
        OrderResponseDto updatedOrder = orderService.changeStatus(id, changeOrderStatusDto);
        return ApiResponse.success(updatedOrder, "Order status changed successfully");
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') || hasAnyAuthority('SELLER')")
    @PutMapping("/line/{id}")
    public ApiResponse<OrderLineItemResponseDto>  changeLineStatus(@RequestBody ChangeOrderLineStatusDto changeOrderLineStatusDto, @PathVariable int id) throws Exception {
        OrderLineItemResponseDto updatedOrder = orderService.changeLineStatus(id, changeOrderLineStatusDto);
        return ApiResponse.success(updatedOrder, "Order line status changed successfully");
    }

    @PreAuthorize("hasAnyAuthority('ADMIN') || hasAnyAuthority('SELLER')")
    @PatchMapping("/{id}/cancel")
    public ApiResponse<OrderResponseDto>  cancelOrder(@PathVariable int id) throws Exception {
        OrderResponseDto updatedOrder = orderService.cancelOrder(id);
        return ApiResponse.success(updatedOrder, "Order cancelled successfully");
    }

    @PreAuthorize("hasAnyAuthority('CUSTOMER')")
    @PatchMapping("/{id}/return")
    public ApiResponse<OrderResponseDto>  returnOrder(@PathVariable int id) throws Exception {
        OrderResponseDto updatedOrder = orderService.returnOrder(id);
        return ApiResponse.success(updatedOrder, "Order requested for return successfully");
    }


}
