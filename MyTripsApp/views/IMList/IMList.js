var ddd = [];

MyTripsApp.IMList = function (params) {

    var data = null;
    var itemList = null;
    var chartType = null;
    var series = null;
    var filter = null;
    var filterText = null;
    var argumentAxisLabel = null;
    var isBarChart = true;

    var selectedBar = new MyTripsApp.SelectedBar();

    try {
        selectedBar = JSON.parse(params.id);
        switch (selectedBar.Chart.name)
        {
            case MyTripsApp.SelectedBar.ChartNameEnum.SEVERITY.name:
                chartType = "bar";        
                filter = "SeverityCode";
                filterText = "Severity";
                //series = { valueField: 'ActualValue', name: 'Value' };
                argumentAxisLabel = { font: { color: 'black', size: 12 }, indentFromAxis: 1, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                data = { store: MyTripsApp.db.graphPerSeverity };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PROBLEMSTATUS.name:
                chartType = "bar";
                filter = "ProblemStatus";
                filterText = "Status";
                argumentAxisLabel = { font: { color: 'black', size: 12 }, indentFromAxis: 1, overlappingBehavior: { mode: 'rotate', rotationAngle: 90 } };
                //series = { valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerProblemStatus };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PRODUCTTYPE.name:
                chartType = "bar";
                filter = "ProductTypeShort";
                filterText = "Product Type";
                argumentAxisLabel = { font: { color: 'black', size: 12 }, indentFromAxis: 1, overlappingBehavior: { mode: 'rotate', rotationAngle: 90 } };
                //series = { valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerProductType };
                break;
            case MyTripsApp.SelectedBar.ChartNameEnum.PRIMARYASSIGNMENT.name:
                chartType = "bar";
                filter = "PrimaryAssignment";
                filterText = "Assignment";                
                argumentAxisLabel = { font: { color: 'black', size: 12 }, indentFromAxis: 1, overlappingBehavior: { mode: 'rotate', rotationAngle: 60 } };
                //series = { valueField: 'ActualValue', name: 'Value' };
                data = { store: MyTripsApp.db.graphPerPrimaryAssignment };
                isBarChart = false;
                break;
            default:
                break;
        }
        PopulateList(filter, selectedBar.Name, filterText, "");
    }
    catch (err) {
        alert(err.message);
    };        
   
    
    var viewModel = {

        barChartVisible: ko.observable(true),
        pieChartVisible: ko.observable(true),

        showItemText: function (e) {
            var item = e.itemData.__key__;
            app.navigate("IMDetails/" + JSON.stringify(item.IncidentId));
        },
        chartOptions: {
            dataSource: data,
            commonSeriesSettings: { argumentField: 'Category', type: chartType, label: { visible: true, format: "fixedPoint" } },
            series: [{valueField: 'ActualValue', name: 'Value'}],
            animation: { easing: 'linear', duration: 2000 },
            argumentAxis: { label: argumentAxisLabel },
            title: { text: selectedBar.Chart.name },
            legend: { visible: 0 },
            tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
            //pointClick: function (point) {
            //    alert(sample.legnth);
            //    sample.push({ name: "aaaa", id: 1 }, { name: "aaaannnnnn", id: 2 });
            //}
            pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(selectedBar.Chart, point.argument, point.value)); }//this.select(); PopulateList(filter, point.argument,filterText,"" );alert(IMs.length)}
        },
        chartOptionsPie: {
            dataSource: data,
            commonSeriesSettings: { argumentField: 'Category', type: 'pie', label: { visible: true, format: "fixedPoint" } },
            series: [{ valueField: 'ActualValue', name: 'Value' }],
            title: { visible: 0, text: selectedBar.Chart.name },
            legend: { visible: 1 },
            tooltip: { enabled: true, format: 'fixedPoint', precision: 1, customizeText: function (point) { return point.argument + ': ' + point.valueText; } },
            pointClick: function (point) { app.navigate("IMList/" + GetSelectedBar(selectedBar.Chart, point.argument, point.value)); }
        },
        
    };

    viewModel.barChartVisible(isBarChart);
    viewModel.pieChartVisible(!isBarChart);

    return viewModel;
};


function GetSelectedBar(chartName, argument, value) {
    var barSelected = new MyTripsApp.SelectedBar();
    barSelected.Chart = chartName;
    barSelected.Name = argument
    barSelected.Value = value;

    return JSON.stringify(barSelected);
}

function PopulateList(filter, name, filterText, filterProperty)
{
    MyTripsApp.db.imList.load({
        filter: [filter, "=", name]
    }).done(function (queryResult) {
        itemList = queryResult;
    });

    var self = this;

    IMs = ko.observableArray([]);

    for (var i = 0; i < itemList.length; i++) {
        self.IMs.push(new IM(itemList[i]));
    }
}

function IM(im) {
    var self = this;
    self.IncidentId = im.IncidentId;
    self.OpenTime = im.OpenTime;
}

