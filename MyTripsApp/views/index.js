MyTripsApp.Index = function (params) {
    var viewModel = {
        message: params.id,
        navigate: function () { app.navigate("Dashboard"); }
    };

     return viewModel;
};
