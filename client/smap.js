Template.smap.helpers({
	getWatchList: function(){
		var arr = [{
			location: "New York",
			title: "blah blah NY 1",
			date: "2015-11-01"
		},{
			location: "New York",
			title: "blah blah NY 2",
			date: "2015-11-02"
		},{
			location: "California",
			title: "blah blah CA flag",
			date: "2015-11-02"
		},{
			location: "California",
			title: "blah blah CA",
			date: "2015-10-30"
		},{
			location: "California",
			title: "blah blah",
			date: undefined
		}]
		// watchedEvent = Watchlist.find().fetch();
		// for (var index in watchedEvent) {
		// 	var currItem = watchedEvent[index];
		// 	var currId = currItem.attractionId;
		// 	var currEvent = Attractions.findOne(currId);
		// 	var json = {};
		//	json.source = currEvent.source;
		// 	json.w_id = currItem._id;
		// 	json.a_id = currId;
		// 	json.date = currEvent.date;
		// 	json.title = currEvent.title;
		// 	json.location = currItem.state;
		// 	arr.push(json);	
		// 	console.log(arr)
		// }
		arr.sort(function(a,b){
			if (typeof a.date === "undefined" && typeof b.date === "undefined") {
				return 0
			}else if (typeof a.date === "undefined") {
				return 1
			}else if (typeof b.date === "undefined") {
				return -1
			}else {
				var dateA = new Date(a.date);
				var dateB = new Date(b.date);
				return dateA-dateB
			}
			
		})
		var state_seq = []
		for (var i in arr) {
			var loc = arr[i].location;
			if (state_seq.indexOf(arr[i].location) == -1){
				state_seq.push(arr[i].location)
			}
		}
		var newArr = []
		for (var i in state_seq) {
			var loc = state_seq[i];
			var json = {};
			var acti = [];
			json.location = loc;
			for (var j in arr) {
				var data = arr[j];
				var acti_json = {};
				if (data.location == loc) {
					acti_json.title = data.title;
					acti_json.w_id = data.w_id;
					acti_json.a_id = data.a_id;
					acti_json.date = data.date;
					acti_json.flag = false;
					acti.push(acti_json);
				}else {
					continue
				}
			}
			json.activities = acti;
			newArr.push(json)
		}
		console.log(newArr);
		return arr
	}
})