MyTripsApp.Dashboard = function (params) {

    var dataSeverity = { store: MyTripsApp.db.graphPerSeverity, sort:"SeverityCode" };
    var dataProblemSatus = { store: MyTripsApp.db.graphPerProblemStatus };
    var dataProductType = { store: MyTripsApp.db.graphPerProductType };
    var dataPrimaryAssignment = { store: MyTripsApp.db.graphPerPrimaryAssignment };
    var imList = { store: MyTripsApp.db.imList };

    var openTimeList = [];

    MyTripsApp.db.imList.load({ sort: function (element) { return element.OpenTimeList; } }).done(function (queryResul) { openTimeList = queryResul })

    var viewModel = {
        countIncidents: imList.store._array.length,
        firstIncidentDate: openTimeList[0].OpenTime,

        chartOptsSeverity: {
        dataSource: dataSeverity,
        commonSeriesSettings: { argumentField: 'Category', type: 'bar', label: { visible: true, format: "fixedPoint",  font:{size:10} } },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        animation: {easing: 'linear', duration: 3000},
        argumentAxis: { label: { font: { color: 'black', size: 10 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } } },
        title: { text: 'Severity' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, font: { size: 16 }, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.SEVERITY, point.argument, point.value)); }
    },
    chartOptsProblemSatus: {
        dataSource: dataProblemSatus,
        commonSeriesSettings: { argumentField: 'Category', label: { visible: true, font: { size: 10 }, format: "fixedPoint"} },
        series: [{ type:'bar', valueField: 'ActualValue', name: 'Value' }],
        animation: { easing: 'linear', duration: 3000 },
        argumentAxis: { label: { font: { color: 'black', size: 10 }, indentFromAxis: 1, overlappingBehavior: { mode: 'rotate', rotationAngle: 90 } } },
        title: { text: 'Problem Status' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, font: { size: 16 }, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.PROBLEMSTATUS, point.argument, point.value)); }
    },
    chartOptsProductType: {
        dataSource: dataProductType,
        commonSeriesSettings: { argumentField: 'Category', type: 'bar', label: { visible: true, font:{size:10}, format: "fixedPoint" } },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        animation: { easing: 'linear', duration: 3000 },
        argumentAxis: { label: { visible: 1, font: { color: 'black', size: 12 }, indentFromAxis:1, overlappingBehavior: { mode: 'rotate', rotationAngle: 90 } } },
        title: { text: 'Product Type' },
        legend: { visible: 0 },
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, font: { size: 16 }, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
        pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(MyTripsApp.SelectedBar.ChartNameEnum.PRODUCTTYPE, point.argument, point.value)); }
    },
    chartOptsPrimaryAssignment: {
        dataSource: dataPrimaryAssignment,
        commonSeriesSettings: { argumentField: 'Category', type: 'pie', label: { visible: true, font:{size:10}, format: "fixedPoint"} },
        series: [{ valueField: 'ActualValue', name: 'Value' }],
        title: { text: 'Primary Assignment' },
        legend: {visible: 1,verticalAlignment: 'bottom',horizontalAlignment: 'center',rowCount: 1,margin: 0},
        tooltip: { enabled: true, format: 'fixedPoint', precision: 1, font: { size: 16 }, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
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

    return JSON.stringify(barSelected);
}

function parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0]); // months are 0-based
}