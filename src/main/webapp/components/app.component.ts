import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BetterDatePipe } from './betterDate.pipe';
import { DataTable, Column, Header, LazyLoadEvent, LineChart } from 'primeng/primeng';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    template: `
        <p-lineChart [value]="chartData" width="1482px" height="480"></p-lineChart>
        
        <p-dataTable *ngIf="partData"   [value]="partData" [rows]="10" 
                                        [paginator]="true" [pageLinks]="3" 
                                        [rowsPerPageOptions]="[5,10,20]" [lazy]="true"
                                        [totalRecords]="totalRecords" (onLazyLoad)="loadCarsLazy($event)">
            <header>All stack exchange data</header>
            <p-column field="id" header="Id" [filter]="true" [sortable]="true"></p-column>
            <p-column field="date" header="Date" [filter]="true"></p-column>
            <p-column field="value" header="Value" [filter]="true" [sortable]="true"></p-column>
        </p-dataTable>
    `,
    directives: [DataTable, Column, Header, LineChart],
    pipes: [BetterDatePipe]
})
export class AppComponent implements OnInit {
    constructor(private http: Http) {}

    allData: any;
    partData: any;
    totalRecords: number;

    chartData: any;
    chartMonths = [];
    chartValues = [];

    parseDate(array: Array<any>) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("date")) array[i].date = new Date(array[i].date).toLocaleDateString();
        }
    }

    setChartMonths(array: Array<any>) {
        console.log(array[1].date);
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("date")) this.chartMonths.push(array[i].date);
        }
    }

    setChartValues(array: Array<any>) {
        for(var i = 0; i < array.length; i++) {
            if(array[i].hasOwnProperty("value")) this.chartValues.push(array[i].value);
        }
    }

    ngOnInit() {
        return this.http.get("/secret/stackexchange/getAll")
            .toPromise()
            .then(response => response.json())
            .then(response => {
                this.parseDate(response.data);
                this.allData = response.data;
                this.totalRecords = response.data.length;
                this.partData = this.allData.slice(1, 20);
                this.setChartMonths(this.partData);
                this.setChartValues(this.allData);

                this.chartData = {
                    labels: this.chartMonths,
                    datasets: [
                        {
                            label: 'My First dataset',
                            fillColor: 'rgba(220,220,220,0.2)',
                            strokeColor: 'rgba(220,220,220,1)',
                            pointColor: 'rgba(220,220,220,1)',
                            pointStrokeColor: '#fff',
                            pointHighlightFill: '#fff',
                            pointHighlightStroke: 'rgba(220,220,220,1)',
                            data: this.chartValues
                        }
                        ]
                }
            })
            .catch(this.handleErr)
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
            this.setChartMonths(this.partData);
            this.setChartValues(this.partData);
        }, 250);
    }
}