Template.smap.helpers({
	locations: function() {
		var location1 = {location: "location1", activities: [{title: "title1.1", date: "date1.1", a_id: "a1.1", w_id: "w1.1", source: "Xola"}, {title: "title1.2", date: "date1.2", a_id: "a1.2", w_id: "w2.1", source: "Xola"}]};
		var location2 = {location: "location2", activities: [{title: "title2.1", date: "date2.1", a_id: "a2.1", w_id: "w2.1", source: "Xola"}, {title: "title2.2", date: "date2.2", a_id: "a2.2", w_id: "w2.2", source: "Stubhub"}]};
		var location3 = {location: "location3", activities: [{title: "title3.1", date: "date3.1", a_id: "a3.1", w_id: "w3.1", source: "Xola"}, {title: "title3.2", date: "date3.2", a_id: "a3.2", w_id: "w2.3", source: "Xola"}]};
		var locations = [location1, location2, location3]
		return locations;
	}
})