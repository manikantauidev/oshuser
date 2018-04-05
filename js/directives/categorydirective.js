angular.module('newapp')
  .directive('categoryDirective', function () {
    return {
		templateUrl: 'views/category.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});