var assert = require("assert")
_ = require('lodash')
var Board = require('./../board')

var board;

function stringify(board) {
	return JSON.stringify(board.grid)
}

function flat(board) {
	return JSON.stringify(_.filter(_.flatten(board.grid)))
}

function pretty(board) {
	console.log()
	for(var r=0;r<board.grid.length;r++) {
		console.log(JSON.stringify(board.grid[r]))
	}
	console.log()
}

describe('Game Board', function () {
	describe('init()', function () {
		it('should create a 4x4 grid', function() {
			board = new Board()
			assert.strictEqual(board.grid.length, 4)
			assert.strictEqual(board.grid[0].length, 4)
		})
	})
	
	describe('spawn()', function () {
		it('should spawn a value in a random location', function () {
			
			assert.strictEqual(flat(board), '[]')
			board.spawn()
			assert.strictEqual(flat(board), '[1]')
			board.spawn()
			assert.strictEqual(flat(board), '[1,1]')
			
		})
	})
	
	
	describe('move() - simple', function() {
		
		var board;
		
		beforeEach(function() {
			board = new Board([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0]
			])
		})
		
		it('should move right', function() {
			board._move('right')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 1],
				[0, 0, 0, 0]
			]))
		})
		
		it('should move left', function() {
			board._move('left')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[1, 0, 0, 0],
				[0, 0, 0, 0]
			]))
		})
		
		it('should move up', function() {
			board._move('up')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 1, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0]
			]))
		})
		
		it('should move down', function() {
			board._move('down')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 1, 0]
			]))
		})
	})
	
	describe('move() - advanced', function() {
		
		it('should apply right one', function() {
			var board = new Board([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 1, 1],
				[0, 0, 0, 0]
			])
			
			board._move('right')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 0, 2],
				[0, 0, 0, 0]
			]))
		})
		
		it('should not apply right one', function() {
			var board = new Board([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 1, 2],
				[0, 0, 0, 0]
			])
			
			board._move('right')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 0],
				[0, 0, 1, 2],
				[0, 0, 0, 0]
			]))
		})
		
		it('should apply three right two', function() {
			var board = new Board([
				[0, 0, 0, 0],
				[0, 0, 2, 2],
				[0, 1, 1, 0],
				[0, 3, 0, 3]
			])
			
			board._move('right')
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 0, 0, 3],
				[0, 0, 0, 2],
				[0, 0, 0, 4]
			]))
		})
		
		it('should apply up two', function() {
			var board = new Board([
				[0, 1, 0, 0],
				[0, 2, 2, 2],
				[4, 2, 1, 0],
				[4, 3, 0, 3]
			])
			board._move('up')
			
			assert.strictEqual(stringify(board), JSON.stringify([
				[5, 1, 2, 2],
				[0, 3, 1, 3],
				[0, 3, 0, 0],
				[0, 0, 0, 0]
			]))
		})
		
		it('should apply down two', function() {
			var board = new Board([
				[0, 1, 0, 0],
				[0, 2, 2, 2],
				[0, 2, 1, 0],
				[0, 3, 0, 3]
			])
			board._move('down')
			
			assert.strictEqual(stringify(board), JSON.stringify([
				[0, 0, 0, 0],
				[0, 1, 0, 0],
				[0, 3, 2, 2],
				[0, 3, 1, 3]
			]))
		})
		
	})
})