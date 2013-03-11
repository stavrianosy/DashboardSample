MyTripsApp.View_ys = function (params) {

    var viewModel = {
//  Put the binding properties here
    };

    return viewModel;
};

var dataSource = [
    { ActualValue: 1, Category: 'Restored' },
    { ActualValue: 2, Category: 'Pending QA testing' },
    { ActualValue: 6, Category: 'Pending UAT testing' },
    { ActualValue: 17, Category: 'Pending QA Migration' },
    { ActualValue: 21, Category: 'Pending Customer' },
    { ActualValue: 56, Category: 'Pending Prod Migration' },
    { ActualValue: 62, Category: 'Vendor In Hand' }
];

chartOptions = {
    dataSource: dataSource,
    theme: 'myTheme',//you need to register the them to work. DevExpress.viz.core.registerTheme(myTheme);
    commonSeriesSettings: {
        argumentField: 'Category',
        type: 'bar',
        label: {
            visible: true,
            format: "fixedPoint",
            precision: 2
        }
    },
    series: [
        { valueField: 'ActualValue', name: 'Value' },
    ],
    title: {
        position:'rightTop',
        text: 'Sample data'
    },
    legend: {
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center'
    },
    pointClick:
        function (point) {
            //this.select();
        app.navigate("Index");
        //$title = 'sasa';
    }
}

var myTheme = {
    name: 'mySuperTheme',
}