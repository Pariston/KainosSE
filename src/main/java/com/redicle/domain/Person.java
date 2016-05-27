package com.redicle.domain;

import javax.xml.bind.annotation.XmlRootElement;

/**
 * Created by Daniel on 27.05.2016.
 */

@XmlRootElement
public class Person {
    private String firstName;
    private String surName;

    public Person() {}

    public Person(String firstName, String surName) {
        this.firstName = firstName;
        this.surName = surName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSurName() {
        return surName;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }
}
