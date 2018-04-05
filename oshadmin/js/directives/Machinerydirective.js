angular.module('newapp')
  .directive('machineryDirective', function () {
    return {
		templateUrl: 'views/Machinery.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});