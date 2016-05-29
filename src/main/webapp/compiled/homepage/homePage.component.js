"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var primeng_1 = require('primeng/primeng');
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var common_1 = require('@angular/common');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var HomePageComponent = (function () {
    function HomePageComponent(http) {
        this.http = http;
        this.chartMonths = [];
        this.chartValues = [
            { data: [], label: 'Unit value' }
        ];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColours = [
            {
                backgroundColor: 'transparent',
                borderColor: 'rgba(255, 44, 44, 0.9)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#1f1f1f',
                pointHoverBackgroundColor: '#1f1f1f',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    // events
    HomePageComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    HomePageComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    HomePageComponent.prototype.parseDate = function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                array[i].date = new Date(array[i].date).toLocaleDateString();
        }
    };
    HomePageComponent.prototype.setChartMonths = function (array) {
        var _chartMonths = new Array(this.allData.length);
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                _chartMonths[i] = array[i].date;
        }
        this.chartMonths = _chartMonths;
    };
    HomePageComponent.prototype.setChartValues = function (array) {
        var _chartValues = new Array(this.allData.length);
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("value"))
                _chartValues[i] = array[i].value;
        }
        this.chartValues[0]["data"] = _chartValues;
    };
    HomePageComponent.prototype.setRangeForChart = function () {
        var _this = this;
        var random = {
            older: this.fromHandDate,
            newer: this.toHandDate
        };
        var headers = new http_1.Headers({
            'Content-Type': 'application/json' });
        return this.http
            .post('/secret/stackexchange/getBetween', JSON.stringify(random), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.parseDate(response.data);
            _this.allData = response.data;
            _this.totalRecords = response.data.length;
            _this.partData = _this.allData.slice(1, 30);
            _this.setChartMonths(_this.allData);
            _this.setChartValues(_this.allData);
        })
            .catch(this.handleErr);
    };
    HomePageComponent.prototype.ngOnInit = function () {
        var _this = this;
        return this.http.get("/secret/stackexchange/getAll")
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.parseDate(response.data);
            _this.allData = response.data;
            _this.totalRecords = response.data.length;
            _this.partData = _this.allData.slice(1, 30);
            _this.setChartMonths(_this.allData);
            _this.setChartValues(_this.allData);
        })
            .catch(this.handleErr);
    };
    HomePageComponent.prototype.handleErr = function (err) {
        console.log(err);
        return err.message || err;
    };
    HomePageComponent.prototype.loadCarsLazy = function (event) {
        //in a real application, make a remote request to load data using state metadata from event
        //event.first = First row offset
        //event.rows = Number of rows per page
        //event.sortField = Field name to sort with
        //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
        //filters: FilterMetadata object having field as key and filter value, filter matchMode as value
        var _this = this;
        //imitate db connection over a network
        setTimeout(function () {
            _this.partData = _this.allData.slice(event.first, (event.first + event.rows));
            //this.setChartMonths(this.allData);
            //this.setChartValues(this.allData);
        }, 250);
    };
    HomePageComponent = __decorate([
        core_1.Component({
            styleUrls: ['components/homepage/homePage.css'],
            templateUrl: 'components/homepage/homePage.html',
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], HomePageComponent);
    return HomePageComponent;
}());
exports.HomePageComponent = HomePageComponent;
