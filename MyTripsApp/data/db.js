
(function () {
    var events = [
        {
            id: "e1",
            trip_id: "t1",
            title: "Space Needle",
            address: "Space Needle, Seattle",
            date: "10 Sep 2012, 02 PM"
        },
        {
            id: "e2",
            trip_id: "t2",
            title: "Chicago Loop",
            address: "Chicago Loop, Chicago",
            date: "13 Oct 2012, 03 PM"
        }
    ];

    var trips = [
		{
		    id: "t1",
		    title: "Go to Seattle",
		    dates: "09 - 14 Sep, 2012",
		    events: [
               events[0]
		    ]
		},
        {
            id: "t2",
            title: "Go to Chicago",
            dates: "12 - 17 Oct, 2012",
            events: [
                events[1]
            ]
        }
    ];

    MyTripsApp.db = {
        trips: new DevExpress.data.ArrayStore(trips),
        events: new DevExpress.data.ArrayStore(events),
    };

})();