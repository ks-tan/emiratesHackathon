Template.smap.helpers({
	getWatchList: function(){
		var arr = []
		watchedEvent = Watchlist.find().fetch();
		for (var index in watchedEvent) {
			var currItem = watchedEvent[index];
			var currId = currItem.attractionId;
			var currEvent = Attractions.findOne(currId);
			var json = {};
			json['source'] = currEvent.source;
			json.w_id = currItem._id;
			json.a_id = currId;
			json.date = currEvent.date;
			json.title = currEvent.title;
			json.location = currItem.state;
			arr.push(json);	
		}
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
					acti_json.source = data.source;
					acti.push(acti_json);
				}else {
					continue
				}
			}
			json.activities = acti;
			newArr.push(json)
		}
		var latestLocDate = []
		for (var i in newArr) {
			var data = newArr[i];
			tmp_acti = [];
			for (var j in data.activities) {
				var json = {}
				json.date = data.activities[j].date;
				json.title = data.activities[j].title;
				tmp_acti.push(json)
			}
			tmp_acti.sort(function(a,b){
				if (typeof a.date === "undefined" && typeof b.date === "undefined") {
					return 0
				}else if (typeof a.date === "undefined") {
					return 1
				}else if (typeof b.date === "undefined") {
					return -1
				}else {
					var dateA = new Date(a.date);
					var dateB = new Date(b.date);
					return dateB-dateA
				}
			});
			latestLocDate.push(tmp_acti[0].date)
		}

		for (i = 0; i < newArr.length - 1; i++) {
			data = newArr[i+1];
			compare_date = latestLocDate[i];
			if (typeof compare_date === "undefined") {
				continue
			}else {
				for (var j in data.activities) {
					acti = data.activities[j]
					if (typeof acti.date === "undefined") {
						break
					}else {
						var dateA = new Date(compare_date);
						var dateB = new Date(acti.date);
						if (dateA - dateB >= 0) {
							data.activities[j].flag = true
						}
					}
				}
			}
		}
		console.log(newArr);
		return newArr
	},
	isXola: function(source) {
		return source == "Xola"
	},

	isStubHub: function(source) {
		return source == "StubHub"
	}
})

Template.smap.events({
	'click #deleteButton': function(event){
		event.preventDefault();
        var id = event.target.value;
        Watchlist.remove(id);
	},
	'click #bookNowButton': function(event) {
		event.preventDefault();
		Session.set('attractionId', event.target.value);
		Router.go('checkout')
	}
})