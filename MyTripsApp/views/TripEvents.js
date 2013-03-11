MyTripsApp.TripEvents = function (params) {

    var viewModel = {
        pageTitle: ko.observable(),
        events: ko.observable()
    };

    var createDetailContent = function (list) {
        viewModel.pageTitle(list[0].title);
        viewModel.events(list[0].events);
    };

    MyTripsApp.db.trips.load({
        filter: ["id", params.id]
    }).done(createDetailContent);

    return viewModel;
};