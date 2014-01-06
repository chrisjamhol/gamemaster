'use strict';

/* Directives */

gamemasterApp.directive('chapter',function(){
	return {
		restrict: 'A',
		templateUrl: 'partials/storyline_chapter',
		link: function(scope,element,attr){
			element.css({cursor: 'pointer'});
		}
	}
});

gamemasterApp.directive('chapterfold', function ($document) {
	return function (scope, element, attrs) {
			element.css({cursor: 'pointer'});
			element.bind('click',function(data){
				var targets = $(this).children(),
					target = targets[0];
				if($(target).is(':visible')){
					$(targets).hide();
				}else{
					$(targets).show();
				}
			});
		};
});