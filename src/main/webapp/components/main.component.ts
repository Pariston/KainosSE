import { Component, OnInit } from '@angular/core';
import { HomePageComponent } from './homepage/homePage.component';
import { CompareComponent } from './compare/compare.component';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from '@angular/router-deprecated';

@Component({
    selector: 'my-app',
    template: `
        <div class="header">
            <div class="centerContainer">
                <ul class="menu">
                    <a [routerLink]="['HomePage']"><li>Home Page</li></a>
                    <a [routerLink]="['Compare']"><li>Compare</li></a>
                </ul>
            </div>
        </div>
        <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS]
})

@RouteConfig([
    {
        path: '/',
        name: 'HomePage',
        component: HomePageComponent,
        useAsDefault: true
    },
    {
        path: '/compare',
        name: 'Compare',
        component: CompareComponent
    }
])

export class MainComponent {
    
}