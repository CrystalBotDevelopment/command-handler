
/**
 * Checks if 1 object matches the other, used for checkin
 * @param a The first object to compare
 * @param b The second object to compare
 * @returns If object A matches object B
 */
export function objectCompare(a: Object | Array<any>, b: Object | Array<any>): boolean {
	if(Object.keys(a).length != Object.keys(b).length) return false;
	if (typeof a != typeof b) return false;

	for(const index in a) {
		if (!b.hasOwnProperty(index)) return false;

		//	@ts-ignore
		const objA = a[index]; const objB = b[index];

		if (typeof objA == 'object' && typeof objB == 'object') {
			if(!objectCompare(objA, objB)) return false;
		}
		else if (!compare(objA, objB)) return false;
	}

	return true;
}


/**
 * Checks the value of a against b
 * @param a The first value to compare
 * @param b The second value to compare
 * @returns if A matches B
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function compare(a: any, b: any): boolean {
	if(typeof a == typeof b)
		return a == b;

	if(typeof a == 'undefined' && typeof b == 'object')
		return Object.keys(b).length == 0;

	if(typeof a == 'object' && typeof b == 'undefined')
		return Object.keys(a).length == 0;

	return false;
}