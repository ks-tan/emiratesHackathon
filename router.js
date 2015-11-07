Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	template: 'home'
});

Router.route('home',{
	template: 'home'
});

Router.route('page1',{
	template: 'page1'
});

Router.route('page2',{
	template: 'page2'
});

Router.route('page3',{
	template: 'page3'
});