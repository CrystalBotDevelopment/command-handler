import { compare, objectCompare } from '../src/functions/objectCompare';

describe('Checking if object compare properly compares the commands with the database', () => {

	describe('Testing values', () => {

		test.each([
			[ 0, 1, false ],
			[ 1, 1, true ],
			[ '0', 0, false ],
			[ [], 0, false ],
			[ { a: 1, b: 2 }, 'undefined', false ],

			[ {}, 'undefined', true ],
			[ 'undefined', {}, true ],
			[ [], 'undefined', true ],
			[ 'undefined', [], true ],

			[ { a: 1 }, 'undefined', false ],
			[ 'undefined', { a: 1 }, false ],
			[ [ 1 ], 'undefined', false ],
			[ 'undefined', [ 1 ], false ],

			[ 'undefined', 'undefined', true ],
		])('%# compare(%p, %p) -> %p', ( a, b, expected ) => {
			if (a == 'undefined') a = undefined as any;
			if (b == 'undefined') b = undefined as any;

			expect(compare(a, b)).toBe(expected);
		});



		test.each([
			[ { a: 1 }, { a: 1 }, true ],
			[ { a: 1 }, { a: 2 }, false ],
			[ { a: 1 }, { b: 1 }, false ],
			[ { a: 1 }, { a: 1, b: 1 }, false ],
			[ { a: 1, b: 1 }, { a: 1 }, false ],
			[ { a: 1, b: 1 }, { a: 1, b: 1 }, true ],
			[ { a: 1, b: 1 }, { a: 1, b: 2 }, false ],
		])('%# objectCompare()', (a, b, expected) => {
			expect(objectCompare(a, b)).toBe(expected);
		});
	});


	describe('Command values', () => {

		test.each([
			[],
			[]
		])('%# objectCompare()', (a,b,expected) => {
			expect(objectCompare(a, b)).toBe(expected);
		});
	});
});