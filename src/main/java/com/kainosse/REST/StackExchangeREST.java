package com.kainosse.REST;

import com.kainosse.domain.data;
import com.kainosse.service.dataService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;

import javax.ws.rs.*;
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

    @POST
    @Path("/getBetween")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public List<data> getBetween(JSONObject json) throws JSONException {
        String older = json.get("older").toString();
        String newer = json.get("newer").toString();
        return ds.getDataBetween(older, newer);
    }
}
