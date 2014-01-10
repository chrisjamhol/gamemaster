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

gamemasterApp.directive('foldfoe', function ($document){
	return function (scope, element, attrs){
		element.css({cursor: 'pointer'});
		element.bind('click',function(data){
			var target = $(this).siblings();
				target = target[0];
			if($(target).is(':visible')){
				$(target).hide();
			}else{
				$(target).show();
			}
		});
	};
});

gamemasterApp.directive('foldfoeattrs', function ($document){
	return function (scope, element, attrs){
		element.css({cursor: 'pointer'});
		element.bind('click',function(data){
			var target = $(this).children();
				target = target[1];
			if($(target).is(':visible')){
				$(target).hide();
			}else{
				$(target).show();
			}
		});
	};
});

gamemasterApp.directive('foedata', function (){
	return {
		restrict: 'A',
		templateUrl: 'partials/edit_encounter_foedata'
	};
});

gamemasterApp.directive('foeattack',function(){
	return {
		restrict: 'A',
		templateUrl: 'partials/edit_encounter_foedata_attack'
	};
});