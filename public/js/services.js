'use strict';

/* Services */

gamemasterApp.service('EncounterData',function(){
	var data = null;
	this.set = function(newData){data = newData;};
	this.get = function(){return data;};
});
