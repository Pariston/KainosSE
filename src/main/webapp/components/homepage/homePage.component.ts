import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { DataTable, Column, Header, LazyLoadEvent } from 'primeng/primeng';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    styleUrls: ['components/homepage/homePage.css'],
    templateUrl: 'components/homepage/homePage.html',
    directives: [DataTable, Column, Header, CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
})

export class HomePageComponent implements OnInit {
    constructor(private http: Http) {}

    allData: any;
    partData: any;
    totalRecords: number;
    chartMonths = [];

    fromHandDate: string;
    toHandDate: string;

    public chartValues:Array<any> = [
        { data: [], label: 'Unit value' }
    ];

    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // grey
            backgroundColor: 'transparent',
            borderColor: 'rgba(255, 44, 44, 0.9)',
            pointBackgroundColor: 'rgba(148,159,177,1)',
            pointBorderColor: '#1f1f1f',
            pointHoverBackgroundColor: '#1f1f1f',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }
    
    parseDate(array: Array<any>) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("date")) array[i].date = new Date(array[i].date).toLocaleDateString();
        }
    }

    setChartMonths(array: Array<any>) {
        let _chartMonths = new Array(this.allData.length);
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("date")) _chartMonths[i] = array[i].date;
        }
        this.chartMonths = _chartMonths;
    }

    setChartValues(array: Array<any>) {
        let _chartValues = new Array(this.allData.length);
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("value")) _chartValues[i] = array[i].value;
        }
        this.chartValues[0]["data"] = _chartValues;
    }

    setRangeForChart() {
        var random = {
            older: this.fromHandDate,
            newer: this.toHandDate
        };

        let headers = new Headers({
            'Content-Type': 'application/json'});

        return this.http
            .post('/secret/stackexchange/getBetween', JSON.stringify(random), {headers: headers})
            .toPromise()
            .then(response => response.json())
            .then(response => {
                this.parseDate(response.data);
                this.allData = response.data;
                this.totalRecords = response.data.length;
                this.partData = this.allData.slice(1, 30);
                this.setChartMonths(this.allData);
                this.setChartValues(this.allData);
            })
            .catch(this.handleErr);
    }

    ngOnInit() {
        return this.http.get("/secret/stackexchange/getAll")
            .toPromise()
            .then(response => response.json())
            .then(response => {
                this.parseDate(response.data);
                this.allData = response.data;
                this.totalRecords = response.data.length;
                this.partData = this.allData.slice(1, 30);
                this.setChartMonths(this.allData);
                this.setChartValues(this.allData);
            })
            .catch(this.handleErr);
    }

    handleErr(err) {
        console.log(err);
        return err.message || err;
    }

    loadCarsLazy(event: LazyLoadEvent) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

        //imitate db connection over a network
        setTimeout(() => {
            this.partData = this.allData.slice(event.first, (event.first + event.rows));
            //this.setChartMonths(this.allData);
            //this.setChartValues(this.allData);
        }, 250);
    }
}