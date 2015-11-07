Meteor.methods({
    "populateXola": function (url) {
        this.unblock();
        return Meteor.http.call("GET", url, {
        	headers: {
        		"X-API-KEY": "2R6XyALRKdHe-ZC-p5VtVkjDo-dDI0iUTtrZlK65woA",
        		"Content-Type": "application/json",
        	}
        });
    }
});