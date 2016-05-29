package main.java.com.kainosse.service;

import com.kainosse.domain.data;
import com.kainosse.service.dataService;
import org.junit.Test;

/**
 * Created by Daniel on 28.05.2016.
 */


public class dataManagerTest {
    private data row = new data();
    private dataService dm = new dataService();

    @Test
    public void addDataTest() {
//        Calendar calendar = Calendar.getInstance();
//        calendar.set(Calendar.YEAR, 1990);
//        calendar.set(Calendar.DAY_OF_MONTH, 1);
//        calendar.set(Calendar.MONTH, 4); // Assuming you wanted May 1st
//        Date date = new Date(calendar.getTime().getTime());
//
//        row.setDate(date);
        row.setValue(100);
        dm.addData(row);
        System.out.println(row.getId() + " " + row.getDate() + " " + row.getValue());
        //assertTrue(false);
    }

    @Test
    public void getDataTest() {
        data row = dm.getDataByID(1);
        //assertNotNull(row.getValue());
        System.out.println(dm.getAllData());
    }
}
