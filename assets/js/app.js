(function() {
	var app = angular.module('gameView', []);
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
	var tempJackCard = new Card(0, 1);
	tempJackCard.attachments = [tempCard];
	you.hand = [tempCard, tempCard, tempCard];
	opponent.hand = [tempCard, tempCard, tempCard];
	you.points = [tempCard, tempJackCard];
	opponent.points = [tempJackCard];
	newGame.players = [you, opponent];

	app.controller('gameViewController', function($scope, $rootScope) {
		this.game = newGame;
		this.pNum = 0;

		this.game.log.push("Player made a move", "Opponent appreciated its gesture", "Player advanced, sexually", "frowns and chocolate"
			, "repetition", "self-loathing", "failure", "underwhelming existential dissastisfaction");

	});
})();