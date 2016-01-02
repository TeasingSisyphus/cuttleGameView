(function() {
	var app = angular.module('gameView', []);

	app.controller('gameViewController', function($scope, $rootScope) {
		this.foo = "foo";
		this.boo = "boo";
	});
})();