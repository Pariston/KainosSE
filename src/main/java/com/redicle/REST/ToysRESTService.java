package com.redicle.REST;

import com.redicle.domain.Person;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;


/**
 * Created by Daniel on 27.05.2016.
 */

@Path("toys")
public class ToysRESTService {

    @GET
    @Path("print")
    @Produces(MediaType.APPLICATION_JSON)
    public Person clicker() {
        Person p = new Person("Daniel", "Bojarski");
        return p;
    }
}
