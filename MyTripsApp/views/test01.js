﻿var dataSource = [
    { state: 'Illinois', year1998: 423.721, year2001: 476.851, year2004: 528.904 },
    { state: 'Indiana', year1998: 178.719, year2001: 195.769, year2004: 227.271 },
    { state: 'Michigan', year1998: 308.845, year2001: 335.793, year2004: 372.576 },
    { state: 'Ohio', year1998: 348.555, year2001: 374.771, year2004: 418.258 },
    { state: 'Wisconsin', year1998: 160.274, year2001: 182.373, year2004: 211.727 },
];

chartOptions = {
    dataSource: dataSource,
    commonSeriesSettings: {
        argumentField: 'state',
        type: 'bar',
        label: {
            visible: true,
            format: "fixedPoint",
            precision: 2
        }
    },
    series: [
        { valueField: 'year2004', name: '2004' },
        { valueField: 'year2001', name: '2001' },
        { valueField: 'year1998', name: '1998' }
    ],
    title: {
        text: 'Great Lakes Gross State Product'
    },
    legend: {
        verticalAlignment: 'bottom',
        horizontalAlignment: 'center'
    }
}