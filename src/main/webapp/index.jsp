<html>
<head>
    <base href="/">
    <title>Angular 2 QuickStart</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="public/styles/global.css">
    <link rel="stylesheet" type="text/css" href="node_modules/primeui/themes/omega/theme.css" />
    <link rel="stylesheet" type="text/css" href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.4.0/css/font-awesome.min.css" />
    <link rel="stylesheet" type="text/css" href="node_modules/primeui/primeui-ng-all.min.css" />
    <!-- 1. Load libraries -->
    <!-- Polyfill(s) for older browsers -->
    <script src="node_modules/chart.js/dist/Chart.bundle.min.js"></script>
    <script src="node_modules/core-js/client/shim.min.js"></script>
    <script src="node_modules/zone.js/dist/zone.js"></script>
    <script src="node_modules/reflect-metadata/Reflect.js"></script>
    <script src="node_modules/systemjs/dist/system.src.js"></script>
    <!-- 2. Configure SystemJS -->
    <script src="systemjs.config.js"></script>
    <script>
        System.import('compiled').catch(function(err){ console.error(err); });
    </script>
</head>
<!-- 3. Display the application -->
<body>
<my-app>Loading...</my-app>
</body>
</html>