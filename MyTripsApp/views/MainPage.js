﻿MyTripsApp.MainPage = function (params) {

    items =  [
    { text: "Graph 1", width: 2, height: 2, image: "img 1", view:"Bar" },
    { text: "Graph 2", width: 2, height: 2, image: "img 2", view: "IMList" },
    { text: "Graph 3", width: 2, height: 2, image: "img 3", view: "IMDetails" },
    { text: "Graph 4", width: 2, height: 2, image: "img 4", view: "IMDetails" },
    ];

    var viewModel = {
        tileOptions: {
            items: items,
            itemRender: function (item) {
                return "Text is: " + item.text;
            },
            itemClick: function (e) { app.navigate(e.itemData.view); }
        }
    };

    return viewModel;
};