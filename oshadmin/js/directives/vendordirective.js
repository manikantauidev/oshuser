angular.module('newapp')
  .directive('vendorDirective', function () {
    return {
		templateUrl: 'views/venreg.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});
