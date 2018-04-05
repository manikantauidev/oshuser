angular.module('newapp')
  .directive('servicesregDirective', function () {
    return {
		templateUrl: 'views/servicesreg.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});
