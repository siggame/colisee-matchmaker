/**
 * Creates a permutation (ie. random shuffle) of the input list.
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
 * 
 * @export
 */
export function permute(list: any[]) {
    const permutation = Array.from(list);
    let window = permutation.length;
    let temp;

    while (window > 0) {
        const randomIndex = Math.floor(Math.random() * window);
        window--;
        temp = permutation[window];
        permutation[window] = permutation[randomIndex];
        permutation[randomIndex] = temp;
    }

    return permutation;
}

/**
 * Create pairs from the input list by pairing each item with the
 * next item in the list. The final item will be paired with the first
 * item.
 * 
 * @export
 */
export function createPairs<T>(list: T[]): [T, T][] {
    // make pair for each element from the original list and
    // the list after being rotated by one to the right
    return list.map((item, i): [T, T] => [item, list[(i + 1) % list.length]]);
}
