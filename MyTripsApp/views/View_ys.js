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
    //theme: 'myTheme',//## you need to register the them to work. DevExpress.viz.core.registerTheme(myTheme);
    commonSeriesSettings: {
        argumentField: 'Category',
        type: 'bar',
        label: {
            visible: true,
            format: "fixedPoint",
            precision: 2
        } //## label for each bar
    },
    series: [
        { valueField: 'ActualValue', name: 'Value' },
    ],
    argumentAxis: {
        label: {
            font: { color: 'black', size: 16 },
            overlappingBehavior: { mode: 'rotate', rotationAngle: 60 }
        }
    },
    title: {
        position:'rightTop',
        text: 'Sample data'
    },    
    legend: {
        visible:0,//##no need for a legend. only one category
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center'
    },
    tooltip: {
        enabled: true,
        format: 'fixedPoint',
        precision: 1,
        customizeText: function(point){
            return point.argument + ': ' + point.valueText;
        }
    },
    pointClick:
        function (point) {
            this.select();
            //alert(point.options.label.position);//ok
            //alert(point.argument);//ok
            //alert(point.value);//ok
            app.navigate("Index/" + ReadParam(point.argument + "{" + point.value + "}"));
        }
}

var myTheme = {
    name: 'mySuperTheme',
}

function ReadParam(param)
{
    var result = "Parameter is not well formated";

    try
    {
        var value = param.substring(param.indexOf('{') + 1, param.indexOf('}'));
        var key = param.substring(0, param.indexOf('{'));

        result = "key=" + key + ", value=" + value;
    }
    catch(err)
    {
        result += ' ' + err.message;
    }

    return result;
}