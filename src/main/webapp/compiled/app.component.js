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
var betterDate_pipe_1 = require('./betterDate.pipe');
var primeng_1 = require('primeng/primeng');
require('rxjs/add/operator/map');
require('rxjs/add/operator/toPromise');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.chartMonths = [];
        this.chartValues = [];
    }
    AppComponent.prototype.parseDate = function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                array[i].date = new Date(array[i].date).toLocaleDateString();
        }
    };
    AppComponent.prototype.setChartMonths = function (array) {
        console.log(array[1].date);
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("date"))
                this.chartMonths.push(array[i].date);
        }
    };
    AppComponent.prototype.setChartValues = function (array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty("value"))
                this.chartValues.push(array[i].value);
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        return this.http.get("/secret/stackexchange/getAll")
            .toPromise()
            .then(function (response) { return response.json(); })
            .then(function (response) {
            _this.parseDate(response.data);
            _this.allData = response.data;
            _this.totalRecords = response.data.length;
            _this.partData = _this.allData.slice(1, 20);
            _this.setChartMonths(_this.partData);
            _this.setChartValues(_this.allData);
            _this.chartData = {
                labels: _this.chartMonths,
                datasets: [
                    {
                        label: 'My First dataset',
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: _this.chartValues
                    }
                ]
            };
        })
            .catch(this.handleErr);
    };
    AppComponent.prototype.handleErr = function (err) {
        console.log(err);
        return err.message || err;
    };
    AppComponent.prototype.loadCarsLazy = function (event) {
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
            _this.setChartMonths(_this.partData);
            _this.setChartValues(_this.partData);
        }, 250);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n        <p-lineChart [value]=\"chartData\" width=\"1482px\" height=\"480\"></p-lineChart>\n        \n        <p-dataTable *ngIf=\"partData\"   [value]=\"partData\" [rows]=\"10\" \n                                        [paginator]=\"true\" [pageLinks]=\"3\" \n                                        [rowsPerPageOptions]=\"[5,10,20]\" [lazy]=\"true\"\n                                        [totalRecords]=\"totalRecords\" (onLazyLoad)=\"loadCarsLazy($event)\">\n            <header>All stack exchange data</header>\n            <p-column field=\"id\" header=\"Id\" [filter]=\"true\" [sortable]=\"true\"></p-column>\n            <p-column field=\"date\" header=\"Date\" [filter]=\"true\"></p-column>\n            <p-column field=\"value\" header=\"Value\" [filter]=\"true\" [sortable]=\"true\"></p-column>\n        </p-dataTable>\n    ",
            directives: [primeng_1.DataTable, primeng_1.Column, primeng_1.Header, primeng_1.LineChart],
            pipes: [betterDate_pipe_1.BetterDatePipe]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
