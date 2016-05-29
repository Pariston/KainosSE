package com.kainosse.REST;

import com.kainosse.domain.data;
import com.kainosse.service.dataService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * Created by Daniel on 28.05.2016.
 */

@Path("stackexchange")
public class StackExchangeREST {
    dataService ds = new dataService();

    @GET
    @Path("/getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<data> getALL() {
        return ds.getAllData();
    }
}
