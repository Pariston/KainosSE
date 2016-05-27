import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'my-app',
    template: `
        <input type='submit' value='Click to see something nice!' (click)='getResponse()' />
        <p *ngIf="result">{{result.firstName}}</p>
    `
})
export class AppComponent {
    constructor(private http: Http) {
        this.getResponse();
    }

    result: any;

    getResponse() {
        return this.http.get("/secret/toys/print")
            .toPromise()
            .then(response => response.json())
            .then(response => {this.result = response; console.log(response); console.log(JSON.stringify(response));})
            .catch(this.handleErr)
    }

    handleErr(err) {
        console.log(err);
        return err.message || err;
    }
}