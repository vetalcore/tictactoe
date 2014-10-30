(function(){
	angular.module('app', []);

	function mainCtrl(boardObject, gameObject){
		var game = this;game.ch = true;
		game.board = boardObject.board;
		game.state = gameObject.score.boardState.slice(0);
		game.players =  gameObject.players;
		game.gameScore = gameObject.score.boardScore;

		game.chooseSide = function(event){
			game.ch = false;
			game.ch = true;
		}

		game.makeTurn = function(event,$compile){
			var elementIndex = Array.prototype.indexOf.call(event.target.parentElement.children, event.target)
			game.state.turns = gameObject.score.turns;
			//console.log();
			if(!game.state[elementIndex] && (/some-directive/).test(event.target.classList)) {
				game.state[elementIndex] = game.players[gameObject.score.turns%2].type;
				gameObject.score.turns++;
			}
			if(Array.prototype.concat.apply([],['x','o'].map(function(z){ return [[0,3,6],[1,4,7,],[2,5,8],[0,1,2],[3,4,5],[,6,7,8],[0,4,8],[6,4,2]].map(function(x){ return x.map(function(y){ return game.state[y] == z && z  }) }).filter(function(x) { return x.every(function(k){ return k; }); }); }))[0]){
				console.log('match');
				gameObject.score.boardScore[Array.prototype.concat.apply([],['x','o'].map(function(z){ return [[0,3,6],[1,4,7,],[2,5,8],[0,1,2],[3,4,5],[,6,7,8],[0,4,8],[6,4,2]].map(function(x){ return x.map(function(y){ return game.state[y] == z && z  }) }).filter(function(x) { return x.every(function(k){ return k; }); }); }))[0][0]] ++;
				game.state = gameObject.score.boardState.slice(0);
				//boardObject.board.map(function(x){return x+8;});
				game.board = game.board.map(function(x){return (x+9)%18;});
				gameObject.score.turns = 0;
				game.gameScore = gameObject.score.boardScore;
				
			}	
			else if(gameObject.score.turns == 9){
				game.state = gameObject.score.boardState.slice(0);
				game.board = game.board.map(function(x){return (x+9)%18;});
				gameObject.score.turns = 0;	
				game.gameScore.draw++;			
				console.log('draw');
			}

		}
	}
	mainCtrl.prototype.someObj = { };
	mainCtrl.$inject = ['boardObject', 'gameObject','$compile'];

	function otherCtrl(){}
	otherCtrl.prototype = Object.create(mainCtrl.prototype);
	
	function firstService(){
		this.methods = function(){

		};
	}

	function gameObject(){
		this.score = {
		 	boardState : [,,,,,,,,],
		 	boardScore : { 'x' : 0, 'o' : 0},
		 	turns : 0
		}
		this.players  = [
			{ type: 'x', clas:'square'},
			{ type: 'o', clas:'circle'}
		];
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
	        transclude: false,
	        link: function (scope, element, attrs) {
	        	var element = element;
	        	element.on('click', function (e) {
	        		//console.log(event.target.children.length);
	        		if (!(/some-directive/).test(event.target.classList) || (/circle|square/).test(event.target.firstChild.classList))return false;
	        		this.firstChild.classList.add(gameObject.players[gameObject.score.turns%2].clas);
	        		
		      	});
		    },
			template: [
			  	'<div class="some-directive">',
			  	'<span></span>',
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