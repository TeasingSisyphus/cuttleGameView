(function() {
	var app = angular.module('gameView', []);
	
	app.directive('draggable', function(){
		return function(scope, element) {
			var el = element[0];
			el.draggable = true;

			el.addEventListener(
				'dragstart', 
				function(e){
					console.log("draggin'");
					e.dataTransfer.effectAllowed = 'move';
					e.dataTransfer.setData('Text', this.id);
					console.log(e.dataTransfer.getData('Text'));
					this.classList.add('drag');
					return false;
				},
				false
			);

			el.addEventListener(
				'dragend',
				function(e) {
					this.classList.remove('drag');
					return false;
				},
				false
			);
		} //End of draggable cb
	}); //End of draggable directive

	app.directive('droppable', function() {
		return {
			scope: {
				drop: '&',
				bin: '='
			},
			link: function(scope, element) {
				var el = element[0];

				el.addEventListener(
					'dragover',
					function(e) {
						e.dataTransfer.dropEffect = 'move';
						e.preventDefault();
							this.classList.add('over');
							return false;

					},
					false
					);
				el.addEventListener(
					'dragenter',
					function(e) {
						this.classList.add('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'dragleave',
					function(e) {
						this.classList.remove('over');
						return false;
					},
					false
				);

				el.addEventListener(
					'drop',
					function(e) {
			          if (e.stopPropagation) e.stopPropagation();

			          	this.classList.remove('over');		
			          	console.log("dragDataText:");
			          	console.log(e.dataTransfer.getData('Text'));
			          	var binId = this.id;				
			          	var item = document.getElementById(e.dataTransfer.getData('Text'));
			          	// item.classList.add('played');
						// this.appendChild(item);
						scope.$apply(function(scope) {
							var fn = scope.drop();  // Drop is declared in the html, we believe            	
							if ('undefined' !== typeof fn) {    	
								var index = item.getAttribute('index');
								fn(index, binId);                	
							}                                   	
						});
						return false;
					},	//function(e)
					false
				);	//addEventListner
			}	//link
		}	//return		
	});	//droppable directive

	var cardId = null;

	var tempGame = function () { //Used to fully populate a game for front-end updates
		this.id = null;
		this.name = '';
		this.turn = null;
		this.players = [];
		this.deck = [];
		this.scrap = [];
		this.topCard = {};
		this.secondCard = {};
		this.scrapTop = {};
		this.firstEffect = {};
		this.twos = [];
		this.winner = null;
		this.log = [];
	};

	var tempPlayer = function () {
		this.id = null;
		this.socketId = '';
		this.pNum = null;
		this.currentGame = null;
		this.points = [];
		this.runes = [];
		this.hand = [];
	};

	var Card = function (suit, rank) {
		this.suit = suit;
		this.rank = rank;
		this.image = '../images/bicycleBackBlue.jpg';
		this.attachments = [];
	}
	var newGame = new tempGame();
	var you = new tempPlayer();
	var opponent = new tempPlayer();
	var tempCard = new Card(3, 1);
	var tempJackCard = new Card(0, 10);
	tempJackCard.attachments = [tempCard];
	you.hand = [tempCard, tempCard, tempCard, tempCard, tempCard, tempCard, tempCard, tempCard];
	opponent.hand = [tempCard, tempCard, tempCard, tempCard];
	you.points = [tempCard, tempJackCard];
	opponent.points = [tempJackCard];
	opponent.runes = [tempCard, tempJackCard];
	newGame.players = [you, opponent];


	app.controller('gameViewController', function($scope, $rootScope) {
		this.game = newGame;
		this.pNum = 0;
		this.yourPointTotal = 11;
		this.opponentPointTotal = 10;
		this.yourPointCap 	= 21;
		this.oppPointCap 	= 21;

		this.countPoints = function() {
			console.log("Inside count points")
			var points = 0;
			$scope.gameView.game.players[$scope.gameView.pNum].points.forEach(function (point) {
				points += point.rank;
			});
			$scope.gameView.yourPointTotal = points;
		}

		$scope.handleDropPoints = function(index, bin) {
			// alert('Item '+ item + ' has been dropped ' + bin);
			console.log(index);
			$scope.gameView.game.players[$scope.gameView.pNum].points.push($scope.gameView.game.players[$scope.gameView.pNum].hand.splice(index, 1)[0]);
			$scope.gameView.countPoints();

		};
		$scope.handleDropRunes = function(index, bin) {

			console.log("Dropped in the right place");
			$scope.gameView.game.players[$scope.gameView.pNum].runes.push($scope.gameView.game.players[$scope.gameView.pNum].hand.splice(index, 1)[0]);
			switch ($scope.gameView.yourPointCap) {
				case 21:
					$scope.gameView.yourPointCap = 14;
					break;
				case 14:
					$scope.gameView.yourPointCap = 10;
					break;
				case 10:
					$scope.gameView.yourPointCap = 7;
					break;
				case 7:
					$scope.gameView.yourPointCap = 5;
					break;
			}
		}
		this.game.log.push("Player made a move", "Opponent appreciated its gesture", "Player advanced, sexually", "frowns and chocolate"
			, "repetition", "self-loathing", "failure", "underwhelming existential dissastisfaction");
	});
})();