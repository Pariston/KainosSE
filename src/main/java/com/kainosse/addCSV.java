package com.kainosse;

import com.kainosse.domain.data;
import com.kainosse.service.dataService;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * Created by Daniel on 28.05.2016.
 */
public class addCSV {

    static dataService ds = new dataService();

    public static void main(String[] args) {
        String fileDirectory = System.getProperty("user.dir")+"/src/main/resources/data.csv";
        String separator = ",";
        String newline = "";
        int counter = 0;

        BufferedReader read = null;

        try {
            read = new BufferedReader(new FileReader(fileDirectory));
            while((newline = read.readLine()) != null) {
                if (counter > 0) {
                    String[] allRows = newline.split(separator);
                    DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
                    java.util.Date d = sdf.parse(allRows[0]);
                    ds.addData(new data(d, Double.parseDouble(allRows[1])));
                }
                counter++;
            }
        } catch(FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}
