package com.redicle.domain;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;
import java.sql.Date;

@Entity
@Table
@XmlRootElement
public class data {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private Date date;
    private double value;

    public data() {}

    public data(int id, Date date, double value) {
        this.id = id;
        this.date = date;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public double getValue() {
        return value;
    }

    public void setValue(double value) {
        this.value = value;
    }
}
