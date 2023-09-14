function calculateMinCost() {
    const inputElement = document.getElementById('rope-lengths');
    const resultElement = document.getElementById('result');

    const input = inputElement.value;
    const ropeLengths = input.split(',').map(Number);

    if (ropeLengths.length < 2) {
        resultElement.textContent = 'Minimum cost cannot be calculated with less than 2 ropes.';
        return;
    }

    ropeLengths.sort((a, b) => a - b);

    let totalCost = 0;

    while (ropeLengths.length >= 2) {
        const shortest1 = ropeLengths.shift();
        const shortest2 = ropeLengths.shift();

        const cost = shortest1 + shortest2;

        totalCost += cost;

        const indexToInsert = ropeLengths.findIndex((rope) => rope >= cost);
        if (indexToInsert === -1) {
            ropeLengths.push(cost);
        } else {
            ropeLengths.splice(indexToInsert, 0, cost);
        }
    }

    resultElement.textContent = 'Minimum Cost: ' + totalCost;
}
