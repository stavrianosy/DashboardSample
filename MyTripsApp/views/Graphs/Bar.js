MyTripsApp.Bar = function (params) {

    var data = null;
    var graphIndex = params.id ? parseInt(params.id) : 0;
    //var barSelected = new DevExpress.data.ArrayStore({ key: "id", data: [] });

    switch (graphIndex) {
        case 0:
            data = { store: MyTripsApp.db.graphPerSeverity };
            break;
        case 1:
            data = { store: MyTripsApp.db.graphPerProblemStatus };
            break;
        case 2:
            data = { store: MyTripsApp.db.graphPerProductType };
            break;
        case 3:
            data = { store: MyTripsApp.db.graphPerPrimaryAssignment };
            break;
        default:
            break;
    };


    var viewModel = {
        colors: { store: MyTripsApp.db.graphs },
        selectedColor: ko.observable(graphIndex),

        chartOptions: {
            dataSource: data,
            //theme: 'myTheme',//## you need to register the them to work. DevExpress.viz.core.registerTheme(myTheme);
            commonSeriesSettings: {
                argumentField: 'Category',
                type: 'bar',
                label: {
                    visible: true,
                    format: "fixedPoint",
                    precision: 2,
                } //## label for each bar
            },
            series: [
                { valueField: 'ActualValue', name: 'Value' },
            ],
            argumentAxis: {                
                label: {
                    font: { color: 'black', size: 16 },
                    overlappingBehavior: {mode: 'rotate', rotationAngle: 60 }
                }
            },
            title: {
                position: 'rightTop',
                text: 'Sample data'
            },
            legend: {
                visible: 0,//##no need for a legend. only one category
                verticalAlignment: 'bottom',
                horizontalAlignment: 'center'
            },
            tooltip: {
                enabled: true,
                format: 'fixedPoint',
                precision: 1,
                customizeText: function (point) {
                    return point.argument + ': ' + point.valueText;
                }
            },
            pointClick:
                function (point) {
                    this.select();
                    //alert(point.options.label.position);//ok
                    //alert(point.argument);//ok
                    //alert(point.value);//ok
                    //app.navigate("IMList/" + ReadParam(point.argument + "{" + point.value + "}"));
                    app.navigate("IMList/" + GetSelectedBar("severity", point.argument, point.value));
                }
        }
    }

    viewModel.selectedColor.subscribe(function (newValue) {
        //alert('The selected color is: ' + newValue);
        // dataSource = null;
        app.navigate("Bar/" + newValue);
    });

    return viewModel;
};


var myTheme = {
    name: 'mySuperTheme',
}

function GetSelectedBar(chartName, argiment, value)
{
    var barSelected = new SelectedBar();
    barSelected.Chart = chartName;
    barSelected.Name = argiment
    barSelected.Value = value ;
    
    return JSON.stringify(barSelected);
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

//Object definitions
function SelectedBar() {
    this.Chart;
    this.Name;
    this.Value;
}