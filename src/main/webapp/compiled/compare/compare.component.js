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
var ng2_charts_1 = require('ng2-charts/ng2-charts');
var common_1 = require('@angular/common');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var CompareComponent = (function () {
    function CompareComponent(http) {
        this.http = http;
        this.chartMonths = [];
        this.startInvestmentValue = 2000;
        this.percentOfInvestment = 0.2;
        this.fundUnit = 20;
        this.chartValues = [
            { data: [], label: 'Investment values' },
            { data: [], label: 'Fund value' }
        ];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColours = [
            {
                backgroundColor: 'transparent',
                borderColor: 'red',
                pointBackgroundColor: 'red',
                pointBorderColor: 'red',
                pointHoverBackgroundColor: '#1f1f1f',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'transparent',
                borderColor: 'blue',
                pointBackgroundColor: 'blue',
                pointBorderColor: 'blue',
                pointHoverBackgroundColor: '#1f1f1f',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
    }
    CompareComponent.prototype.setFundUnit = function (value) {
        this.fundUnit = value;
    };
    // events
    CompareComponent.prototype.chartClicked = function (e) {
        //console.log(e);
    };
    CompareComponent.prototype.chartHovered = function (e) {
        //console.log(e);
    };
    CompareComponent.prototype.parseDate = function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                array[i].date = new Date(array[i].date).toLocaleDateString();
        }
    };
    CompareComponent.prototype.setChartMonths = function (array) {
        var _chartMonths = new Array(this.allData.length);
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                _chartMonths[i] = array[i].date;
        }
        this.chartMonths = _chartMonths;
    };
    CompareComponent.prototype.setChartValues = function (array) {
        var _chartValues = new Array(this.allData.length);
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("value"))
                _chartValues[i] = array[i].value;
        }
        this.chartValues[0]["data"] = _chartValues;
    };
    CompareComponent.prototype.setInvestmentValues = function (array) {
        var _investmentValues = new Array((this.allData.length));
        _investmentValues[0] = this.startInvestmentValue;
        for (var i = 1; i < _investmentValues.length; i++) {
            _investmentValues[i] = _investmentValues[i - 1] + ((this.startInvestmentValue * this.percentOfInvestment) / this.allData.length);
        }
        this.chartValues[0]["data"] = _investmentValues;
    };
    CompareComponent.prototype.setFundValues = function (array) {
        var _fundValues = new Array(this.allData.length);
        _fundValues[0] = this.startInvestmentValue;
        for (var i = 1; i < _fundValues.length; i++) {
            if (this.allData[i].value > this.allData[i - 1].value) {
                _fundValues[i] = _fundValues[i - 1] + this.fundUnit * (this.allData[i].value - this.allData[i - 1].value);
            }
            else if (this.allData[i].value < this.allData[i - 1].value) {
                _fundValues[i] = _fundValues[i - 1] - this.fundUnit * (this.allData[i - 1].value - this.allData[i].value);
            }
            else {
                _fundValues[i] = _fundValues[i - 1];
            }
        }
        this.chartValues[1]["data"] = _fundValues;
    };
    CompareComponent.prototype.refreshChart = function () {
        this.setChartMonths(this.allData);
        this.setChartValues(this.allData);
        this.setInvestmentValues(this.allData);
        this.setFundUnit(this.startInvestmentValue / this.allData[0].value);
        this.setFundValues(this.allData);
    };
    CompareComponent.prototype.setRangeForChart = function () {
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
            _this.refreshChart();
        })
            .catch(this.handleErr);
    };
    CompareComponent.prototype.ngOnInit = function () {
        var _this = this;
        return this.http.get("/secret/stackexchange/getAll")
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.parseDate(response.data);
            _this.allData = response.data;
            _this.refreshChart();
        })
            .catch(this.handleErr);
    };
    CompareComponent.prototype.handleErr = function (err) {
        return err.message || err;
    };
    CompareComponent = __decorate([
        core_1.Component({
            styleUrls: ['components/homepage/homePage.css'],
            templateUrl: 'components/compare/compare.html',
            directives: [ng2_charts_1.CHART_DIRECTIVES, common_1.NgClass, common_1.CORE_DIRECTIVES, common_1.FORM_DIRECTIVES],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], CompareComponent);
    return CompareComponent;
}());
exports.CompareComponent = CompareComponent;
