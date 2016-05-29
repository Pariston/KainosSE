"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var main_component_1 = require('./main.component');
var http_1 = require('@angular/http');
platform_browser_dynamic_1.bootstrap(main_component_1.MainComponent, [http_1.HTTP_PROVIDERS]);
