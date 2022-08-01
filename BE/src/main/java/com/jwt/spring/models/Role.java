package com.jwt.spring.models;

import javax.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    //
    //Data Members
    //
    @Id //primary key ID
    @GeneratedValue(strategy = GenerationType.IDENTITY) //autogenerated value
    private Integer id;

    //pulls from the EROLE class
    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private ERole name;

    //
    //Constructors
    //
    public Role(){}

    //
    //Accessors
    //

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ERole getName() {
        return name;
    }

    public void setName(ERole name) {
        this.name = name;
    }
}