package com.minimart.role.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.minimart.user.entity.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String title;
    private String slug;

    @JsonIgnore
    @ManyToMany(mappedBy = "roles", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<User> users = new ArrayList<>();
}
