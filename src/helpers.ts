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

export function generateDerangedPairs<T>(list: T[]): [T, T][] {
    // make pair for each element from the original list and
    // the list after being rotated by one to the right
    return list.map((item, i): [T, T] => [item, list[(i + 1) % list.length]]);
}
