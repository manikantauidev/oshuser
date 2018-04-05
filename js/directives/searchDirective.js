angular.module('newapp')
  .directive('searchDirective', function () {
    return {
		templateUrl: 'views/searchDirective.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});