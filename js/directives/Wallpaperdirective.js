angular.module('newapp')
  .directive('wallpaperDirective', function () {
    return {
		templateUrl: 'views/Wallpaper.html',
		restrict: 'AE',
		replace: true,
		link: function postLink(scope, element, attrs) {
		}
	};
});