MyTripsApp.Dashboard = function (params) {

    var dataSeverity = { store: MyTripsApp.db.graphPerSeverity };
    var dataProblemSatus = { store: MyTripsApp.db.graphPerProblemStatus };
    var dataProductType = { store: MyTripsApp.db.graphPerProductType };
    var dataPrimaryAssignment = { store: MyTripsApp.db.graphPerPrimaryAssignment };

var viewModel = {    
        chartOptsSeverity: {
        dataSource: dataSeverity,
        commonSeriesSettings: { argumentField: 'Category', type: 'bar', label: { visible: true, format: "fixedPoint", precision: 2 } },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        argumentAxis: { label: { font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } } },
        title: { text: 'Severity' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.SEVERITY, point.argument, point.value)); }
    },
    chartOptsProblemSatus: {
        dataSource: dataProblemSatus,
        commonSeriesSettings: { argumentField: 'Category', label: { visible: true, format: "fixedPoint", precision: 2 } },
        series: [{ type: 'line', valueField: 'ActualValue', name: 'Value' }],
        argumentAxis: { label: { font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } } },
        title: { text: 'Problem Status' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.PROBLEMSTATUS, point.argument, point.value)); }
    },
    chartOptsProductType: {
        dataSource: dataProductType,
        commonSeriesSettings: { argumentField: 'Category', type: 'bar', label: { visible: true, format: "fixedPoint", precision: 2 } },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        argumentAxis: { label: { visible: 0, font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } } },
        title: { text: 'Product Type' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.PRODUCTTYPE, point.argument, point.value)); }
    },
    chartOptsPrimaryAssignment: {
        dataSource: dataPrimaryAssignment,
        commonSeriesSettings: { argumentField: 'Category', type: 'pie', label: { visible: true, format: "fixedPoint", precision: 2 } },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        title: { text: 'Primary Assignment' },
        legend: { visible: 1 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.PRIMARYASSIGNMENT, point.argument, point.value)); }
    },
};

    return viewModel;
};

function GetSelectedBar(chartName, argiment, value) {
    var barSelected = new MyTripsApp.SelectedBar();
    barSelected.Chart = chartName;
    barSelected.Name = argiment
    barSelected.Value = value;

    //alert(JSON.stringify(barSelected));

    return JSON.stringify(barSelected);
}