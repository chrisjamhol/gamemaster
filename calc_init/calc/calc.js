var calcApp = angular.module('calcApp', [])
	.controller('calcController',['$scope',function ($scope){
		$scope.attackInputs = {};

		$scope.encounters = {
			"0": {
					name: "underground (Spiders)",
					foes: {
							"0": {
								name: "Giant Spider",
								hp: 35,
								currentHp: 35,
								def: 14,
								armor: 5,
								speed: 14,
								attacks: [
									{name:"bite", value:"2d6"},
									{name:"web", value: "tn11-Dex(Acrobatics) / releas: tn13-Strenght(Might)"}
								],
								attrs: {
									'Commun':-1,
									'Const': 3,
									'Cunning': -2,
									'Dext': 4,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 3,
									'Willpow': 1
								},
								alive: true
							},
							"1": {
								name: "Spider 1",
								hp: 15,
								currentHp: 15,
								def: 11,
								armor: 0,
								attacks: [
									{name:"bite", value:"1d6"}
								],
								attrs: {
									'Commun':-1,
									'Const': 2,
									'Cunning': -2,
									'Dext': 4,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							},
							"2": {
								name: "Spider 2",
								hp: 15,
								currentHp: 15,
								def: 11,
								armor: 0,
								attacks: [
									{name:"bite", value:"1d6"}
								],
								attrs: {
									'Commun':-1,
									'Const': 2,
									'Cunning': -2,
									'Dext': 4,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							},
							"3": {
								name: "Spider 3",
								hp: 15,
								currentHp: 15,
								def: 11,
								armor: 0,
								attacks: [
									{name:"bite", value:"1d6"}
								],
								attrs: {
									'Commun':-1,
									'Const': 2,
									'Cunning': -2,
									'Dext': 4,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							}
						},
					xp: 210,
					loot: ["no"],
					story: "Ihr seit im Brunnen und seit seltsamen Geräuschen gefolgt."+
							"Als ihr euch dem Geräusch nähert bemerkt ihr links von euch einen kleine Abzweigung in der ihr einen Schatten wahrnehmt."+
							"Ihr erschreckt euch!"+
							"'Hallo, wer ist da?' hört ihr eine Stimme sagen"+
							"Ah hallo, ich bin es, Vaelin!"+
							"Ich folgte einem gigantischen Org, was macht ihr hier?"+
							"<Bäääähm>spinnen"+
							"er tötete meine Kameraden, er und seine mitstreiter. Wir konnten nur schwer standthalten. Ich bin der Einzigste der noch fähig war"+
							" dieser Kreatur zu folgen um sie zur Strecke zu bringen..."
				},
			"1": {
					name: "killing the org",
					foes: {
							"0": {
								name: "gigantischer org",
								hp: 90,
								currentHp: 90,
								def: 10,
								armor: 5,
								attacks: [
									{name:"Keule", value:"2d6"},
									{name:"Schrei", value: "stunn all if !TN13-Willpower"}
								],
								attrs: {
									'Commun':-1,
									'Const': 5,
									'Cunning': -2,
									'Dext': 0,
									'Magic': 0,
									'Percep': 0,
									'Strenght': 5,
									'Willpow': 5
								},
								alive: true
							}
						},
					xp: 50,
					loot: ["5g","Ring der Genauhigkeit (attrroll +3)","orghaut (grob)","storyxp 50"],
					story: "Der gigantische Org sitzt in der Ecke und bemerkt die Reisenede wärend er sich eine Rattensuppe kocht"
				},
			"2": {
					name: "Verschwindenden Tiere (Nacht)",
					foes: {
							"0": {
								name: "Monster",
								hp: 45,
								currentHp: 45,
								def: 13,
								armor: 0,
								attacks: [
									{name:"Blitz", value:"2d6 - 2"},
									{name:"Giftnebel", value: "1d6 area 10 yard"},
									{name:"Schaframmbock", value: "1d6"},
									{name:"Rückzug", value:"move 30 yards"}
								],
								attrs: {
									'Commun':-1,
									'Const': 5,
									'Cunning': -2,
									'Dext': 0,
									'Magic': 0,
									'Percep': 0,
									'Strenght': 5,
									'Willpow': 5
								},
								alive: true
							}
						},
					xp: 50,
					loot: ["28 silber","Ring der Wahnsinns (strength -1, willpower +2)","storyxp 50"],
					story: "Es ist Nacht. Ihr wartet in den Büschen und beobachtet das Feld. Nach einiger Zeit seht ihr ein Kind mit einer Flöte. Es spielt "+
							"eine angsteinflösende Melodie welche die Tiere zunächst aufschreckt. Doch nach im nächsten Moment sind sie völlig ruhig "+
							"Sie laufen nun in Richtung ausgang des Gatters. <? Was tun ?> "+
							"Motive: Hunger, viel Hunger "+
							"Das Kind verwandelt sich in eien ausgewachenes Monster! "+
							"Result: Flöte verschwindet mit Monster"
				},
			"3": {
				name: "Der Dieb",
					foes: {
							"0": {
								name: "Dieb",
								hp: 45,
								currentHp: 45,
								def: 16,
								armor: 1,
								attacks: [
									{name:"Stab", value:"2d6"},
									{name:"Nakosegift", value: "1d6 TN12-Willpower 10 yard"},
									{name:"Wurfmesser", value: "1d6 20 yard"}
								],
								attrs: {
									'Commun': 4,
									'Const': 2,
									'Cunning': 2,
									'Dext': 2,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							},
							"1": {
								name: "Helfer 1",
								hp: 20,
								currentHp: 20,
								def: 13,
								armor: 0,
								attacks: [
									{name:"Stab", value:"1d6"}
								],
								attrs: {
									'Commun': 4,
									'Const': 2,
									'Cunning': 2,
									'Dext': 2,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							},
							"2": {
								name: "Helfer 1",
								hp: 20,
								currentHp: 20,
								def: 13,
								armor: 0,
								attacks: [
									{name:"Stab", value:"1d6"}
								],
								attrs: {
									'Commun': 4,
									'Const': 2,
									'Cunning': 2,
									'Dext': 2,
									'Magic': 0,
									'Percep': 3,
									'Strenght': 1,
									'Willpow': 1
								},
								alive: true
							}
						},
					xp: 50,
					loot: ["1 gold","storyxp 50"],
					story: ""
			}
		};

		$scope.attack = function(encIndex,foeIndex,foe){
			foe.currentHp = foe.currentHp - $scope.attackInputs[encIndex+'_'+foeIndex];
			if(foe.currentHp <= 0){foe.alive=false;}
		};


	}])
	.directive('fold', function ($document) {
		return function (scope, element, attrs) {
				element.css({cursor: 'pointer'});
				element.bind('click',function(data){
					var targets = $(this).siblings(),
						target = targets[0];
					if($(target).is(':visible')){
						$(target).hide();
					}else{
						$(target).show();
					}
				});
			};
	})
	.directive('foldtable', function ($document){
		return function (scope, element, attrs){
			element.css({cursor: 'pointer'});
			element.bind('click',function(data){
				console.log("hi");
				var target = $(this).children();
				target = target[0];
				if($(target).is(':visible')){
					$(target).hide();
				}else{
					$(target).show();
				}
			});
		};
	});