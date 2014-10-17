(function(){
	angular.module('app', []);

	function mainCtrl(boardObject, gameObject){
		var game = this;
		game.board = boardObject.board;
		game.score = gameObject.score.boardState;
		game.players =  gameObject.players;
		game.gameScore = gameObject.score.boardScore;

		game.chooseSide = function(event){
			console.log(event.target.value);
		}

		game.makeTurn = function(event){
			var elementIndex = Array.prototype.indexOf.call(event.target.parentElement.children, event.target)
			game.score.turns = gameObject.score.turns;
			if(!event.target.innerText) {
				game.score[elementIndex] = game.players[gameObject.score.turns%2];
				gameObject.score.turns++;
			}
			if(Array.prototype.concat.apply([],['x','o'].map(function(z){ return [[0,3,6],[1,4,7,],[2,5,8],[0,1,2],[3,4,5],[,6,7,8],[0,4,8],[6,4,2]].map(function(x){ return x.map(function(y){ return game.score[y] == z && z  }) }).filter(function(x) { return x.every(function(k){ return k; }); }); }))[0]){
				console.log('match');
				gameObject.score.boardScore[Array.prototype.concat.apply([],['x','o'].map(function(z){ return [[0,3,6],[1,4,7,],[2,5,8],[0,1,2],[3,4,5],[,6,7,8],[0,4,8],[6,4,2]].map(function(x){ return x.map(function(y){ return game.score[y] == z && z  }) }).filter(function(x) { return x.every(function(k){ return k; }); }); }))[0][0]] ++;
				game.score = ['','','','','','','','',''];
				//game.board = boardObject.board;
				gameObject.score.turns = 0;
				game.gameScore = gameObject.score.boardScore;

			}	
			else if(gameObject.score.turns == 9){
				game.score = ['','','','','','','','',''];
				//game.board = boardObject.board;
				gameObject.score.turns = 0;				
				console.log('draw');
			}

		}
	}
	mainCtrl.prototype.someObj = { };
	mainCtrl.$inject = ['boardObject', 'gameObject'];

	function otherCtrl(){}
	otherCtrl.prototype = Object.create(mainCtrl.prototype);
	
	function firstService(){
		this.methods = function(){

		};
	}

	function gameObject(){
		this.score = {
		 	boardState : ['1 ','1 ',' 1','1 ',' 1','1 ','1 ','1 ','1 '],
		 	boardScore : { 'x' : 0, 'o' : 0},
		 	turns : 0
		}
		this.players  = { 0: 'x', 1:'o'};
		return this;
	}

	function boardObject(gameObject){
		var obj = {};
		obj.boardLength;
		obj.board = Array.apply(null, Array(obj.boardLength || 9)).map(function(x,i){ return i;});
		obj.setBoardSize = function(length){ obj.boardLength = length };
		return obj;
	}

	function someDirective(gameObject) {
		return {
			restrict: 'EA',
	        replace: true,
	        transclude: true,
	        link: function (scope, element, attrs) {
	        	element.on('click', function () {
		      		var self = this;
		        	console.log();
		        	//self.innerHTML = gameObject.players[gameObject.turns%2];
		      	});
		    },
			template: [
			  	'<div class="some-directive">',
			  	'{{game.score[$index]}}',
			    '</div>'
			].join('')
		};
	}
	someDirective.$inject = ['gameObject'];
	function someFilter(){
		return function(items){
			return items.filter(function(item){
				return /^a/i.test(item.name);
			});
		};
	}

	angular
		.module('app',[])
		.controller('mainCtrl', mainCtrl)
		.controller('otherCtrl', otherCtrl)
		.factory('boardObject', boardObject)
		.factory('gameObject', gameObject)
		.directive('someDirective', someDirective)
		.filter('someFiler', someFilter);
})();


////using resolve in routeProvider
// recommended
// function MainCtrl (SomeService) {
//   this.something = SomeService.something;
// }

// MainCtrl.resolve = {
//   doSomething: function (SomeService) {
//     return SomeService.doSomething();
//   }
// };

// function config ($routeProvider) {
//   $routeProvider
//   .when('/', {
//     templateUrl: 'views/main.html',
//     controllerAs: 'vm',
//     controller: 'MainCtrl'
//     resolve: MainCtrl.resolve
//   });
// }