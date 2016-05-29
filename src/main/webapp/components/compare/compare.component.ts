import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    styleUrls: ['components/homepage/homePage.css'],
    templateUrl: 'components/compare/compare.html',
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
})

export class CompareComponent implements OnInit {
    constructor(private http: Http) {}

    allData: any;
    chartMonths = [];

    fromHandDate: string;
    toHandDate: string;

    startInvestmentValue: number = 2000;
    percentOfInvestment: number = 0.2;

    fundUnit: number = 20;

    public chartValues:Array<any> = [
        { data: [], label: 'Investment values' },
        { data: [], label: 'Fund value' }
    ];

    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [
        { // red
            backgroundColor: 'transparent',
            borderColor: 'red',
            pointBackgroundColor: 'red',
            pointBorderColor: 'red',
            pointHoverBackgroundColor: '#1f1f1f',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        },
        { // blue
            backgroundColor: 'transparent',
            borderColor: 'blue',
            pointBackgroundColor: 'blue',
            pointBorderColor: 'blue',
            pointHoverBackgroundColor: '#1f1f1f',
            pointHoverBorderColor: 'rgba(148,159,177,0.8)'
        }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';

    public setFundUnit(value) {
        this.fundUnit = value;
    }

    // events
    public chartClicked(e:any):void {
        //console.log(e);
    }

    public chartHovered(e:any):void {
        //console.log(e);
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

    setInvestmentValues(array: Array<any>) {
        let _investmentValues = new Array((this.allData.length));
        _investmentValues[0] = this.startInvestmentValue;
        for(var i = 1; i < _investmentValues.length; i++) {
            _investmentValues[i] = _investmentValues[i-1] + ((this.startInvestmentValue*this.percentOfInvestment)/this.allData.length);

        }
        this.chartValues[0]["data"] = _investmentValues;
    }

    setFundValues(array: Array<any>) {
        let _fundValues = new Array(this.allData.length);
        _fundValues[0] = this.startInvestmentValue;
        for(var i = 1; i < _fundValues.length; i++) {
            if(this.allData[i].value > this.allData[i-1].value) {
                _fundValues[i] = _fundValues[i-1] + this.fundUnit*(this.allData[i].value - this.allData[i-1].value);
            } else if(this.allData[i].value < this.allData[i-1].value) {
                _fundValues[i] = _fundValues[i-1] - this.fundUnit*(this.allData[i-1].value - this.allData[i].value);
            } else {
                _fundValues[i] = _fundValues[i-1];
            }
        }
        this.chartValues[1]["data"] = _fundValues;
    }

    refreshChart() {
        this.setChartMonths(this.allData);
        this.setChartValues(this.allData);
        this.setInvestmentValues(this.allData);
        this.setFundUnit(this.startInvestmentValue/this.allData[0].value);
        this.setFundValues(this.allData);
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
                this.refreshChart();
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
                this.refreshChart();
            })
            .catch(this.handleErr);
    }

    handleErr(err) {
        return err.message || err;
    }
}