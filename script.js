function calculateMinCost() {
    return new Promise(resolve => {
        const inputText = document.getElementById("rope-lengths").value;
        const ropeLengths = inputText.split(',').map(Number);

        const minHeap = new MinHeap();

        ropeLengths.forEach(length => minHeap.insert(length));

        let totalCost = 0;

        while (minHeap.size() > 1) {
            const rope1 = minHeap.extractMin();
            const rope2 = minHeap.extractMin();

            const cost = rope1 + rope2;
            totalCost += cost;

            minHeap.insert(cost);
        }
        const resultDiv = document.getElementById("result");
        resultDiv.innerText = `Minimum Cost: ${totalCost}`;
        resolve(totalCost);
    });
}
