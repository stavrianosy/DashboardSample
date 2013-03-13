MyTripsApp.IMDetails = function (params) {

    try {
        var incident = new MyTripsApp.Incident();

        MyTripsApp.db.imList.load({
            filter: ["IncidentId", "=", JSON.parse(params.id)]
        }).done(function (queryResult) {
            //##The result should alwawys be one item.
            incident = queryResult[0];
        });
    }
    catch (err) {
        alert(err.message);
    };

    var viewModel = {
        txtIncidentID: incident.IncidentId,
        txtSeverityCode: incident.SeverityCode,
        txtOpenTime: incident.OpenTime,
        txtEnvironment: incident.Environment,
        txtProblemType: incident.ProblemType,
        txtProblemStatus: incident.ProblemStatus,
        txtProductType: incident.ProductType,
        txtBriefDescription: incident.BriefDescription,
        txtPrimaryAssignment: incident.PrimaryAssignment,
        txtNedReportBack: incident.txtNedReportBack,
        txtCloseTime: incident.CloseTime,
        txtResolutionCode: incident.ResolutionCode,
        txtOpenForDescription: incident.HasBeenOpenedForDescription
    };

    return viewModel;
};