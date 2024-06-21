package com.minimart.user.dto.response;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserListDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String image;
    private LocalDate addedOn;
//    private  boolean deleted;
}
