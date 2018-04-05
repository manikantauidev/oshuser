angular.module('newapp')
  .directive('architectsDirective', function () {
    return {
		templateUrl: 'views/Architects.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});