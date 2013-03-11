window.MyTripsApp = window.MyTripsApp || {};

$(function() {
    app = new DevExpress.framework.html.HtmlApplication({
        ns: MyTripsApp,
        viewPortNode: document.getElementById("viewPort"),
        defaultLayout: MyTripsApp.config.defaultLayout,
        navigation: MyTripsApp.config.navigation
    });
    app.router.register(":view/:id", { view: "Index", id: undefined });
});
