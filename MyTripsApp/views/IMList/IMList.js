MyTripsApp.IMList = function (params) {

    var data = null;
    //var itemList = null;
    var chartType = null;
    var series = null;
    var filter = null;
    var filterText = null;
    var argumentAxisLable = null;

    var selectedBar = new MyTripsApp.SelectedBar();

    try {
        selectedBar = JSON.parse(params.id);
        switch (selectedBar.Chart.name)
        {
            case MyTripsApp.SelectedBar.ChartNameEnum.SEVERITY.name:
                chartType = "bar";        
                filter = "SeverityCode";
                filterText = "Severity";
                series = { valueField: 'ActualValue', name: 'Value' };
                argumentAxisLable = { font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                data = { store: MyTripsApp.db.graphPerSeverity };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PROBLEMSTATUS.name:
                chartType = "bar";
                filter = "ProblemStatus";
                filterText = "Status";
                argumentAxisLable = { font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                series = { type: 'line', valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerProblemStatus };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PRODUCTTYPE.name:
                chartType = "bar";
                filter = "ProductType";
                filterText = "Product Type";
                argumentAxisLable = { visible:0, font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                series = { valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerProductType };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PRIMARYASSIGNMENT.name:
                chartType = "bar";
                filter = "PrimaryAssignment";
                filterText = "Assignment";                
                argumentAxisLable = { font: { color: 'black', size: 16 }, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                series = { valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerPrimaryAssignment };
                break;
            default:
                break;                
        }

        itemList = {
            store: MyTripsApp.db.imList,
            filter: [filter, "=", selectedBar.Name],
            map: function (element) {
                var nameExtended = element.IncidentId + " (" + filterText + " - " + element[filter] + ")"; return { name: nameExtended }
            },
        };
    }
    catch (err) {
        alert(err.message);
    };

    var viewModel = {
        showItemText: function (e) {
            var item = e.itemData.__key__;
            app.navigate("IMDetails/" + JSON.stringify(item.IncidentId));
        },
        chartOptions: {
            dataSource: data,
            commonSeriesSettings: { argumentField: 'Category', type: chartType, label: { visible: true, format: "fixedPoint", precision: 2 } },
            series: [series],
            argumentAxis: { label: argumentAxisLable },
            title: { text: selectedBar.Chart.name },
            legend: { visible: 0 },
            tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
            pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(selectedBar.Chart, point.argument, point.value)); }
        },
        chartOptionsPie: {
            dataSource: data,
            commonSeriesSettings: { argumentField: 'Category', type: 'pie', label: { visible: true, format: "fixedPoint", precision: 2 } },
            series: [{ valueField: 'ActualValue', name: 'Value' }],
            title: {visible:0, text: selectedBar.Chart.name },
            legend: { visible: 1 },
            tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
            pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(selectedBar.Chart, point.argument, point.value)); }
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

