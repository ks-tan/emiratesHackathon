Template.page2.events({
	"input #testTextField": function (event) {
    onInputChange(event.target.value);
  }
});

function onInputChange(inputVal) {
	console.log(inputVal);
}

