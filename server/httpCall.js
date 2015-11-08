Meteor.methods({
    "populateXola": function (url) {
        this.unblock();
        return Meteor.http.call("GET", url, {
        	headers: {
        		"X-API-KEY": "2R6XyALRKdHe-ZC-p5VtVkjDo-dDI0iUTtrZlK65woA",
        		"Content-Type": "application/json",
        	}
        });
    },
    'populateStubHub': function(){
    	this.unblock();
        records = [];
        // These states have been populated: "AL","AK", "AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD", "MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND"
        var states= ["OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];
        for (var index in states) {
            state = states[index];
            var StubHubData = Meteor.http.call("GET", "https://api.stubhub.com/search/catalog/events/v3?status=active |contingent&country=US&state=" + state + "&locale=en_US&sort=eventDateLocal desc&rows=100", {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded", 
                    "Authorization": "Bearer _1hIP1xScbqeu3RqpdRjdTkNTswa"}
            });
            // records.push(StubHubData)
            if (StubHubData.data.numFound == 0) {
                console.log('No data for ' + state)
            } else{
                console.log(state + ' has ' + StubHubData.data.numFound + ' records');
                console.log(state + ' retrieved ' + StubHubData.data.events.length + ' records');
            }
            records.push(StubHubData.data.events)
        };
        return records
    }
});