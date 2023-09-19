function calculateMinCost() {
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
}

class MinHeap {
    constructor() {
        this.heap = [];
    }
    size() {
        return this.heap.length;
    }
    insert(value) {
        this.heap.push(value);
        this.bubbleUp(this.heap.length - 1);
    }
    extractMin() {
        if (this.size() === 0) {
            return null;
        }

        if (this.size() === 1) {
            return this.heap.pop();
        }
        const minValue = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.heapify(0);
        return minValue;
    }
    bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex);
                index = parentIndex;
            } else {
                break;
            }
        }
    }
    heapify(index) {
        const leftChildIndex = 2 * index + 1;
        const rightChildIndex = 2 * index + 2;
        let smallestIndex = index;
        if (leftChildIndex < this.size() && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = leftChildIndex;
        }
        if (rightChildIndex < this.size() && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
            smallestIndex = rightChildIndex;
        }
        if (smallestIndex !== index) {
            this.swap(index, smallestIndex);
            this.heapify(smallestIndex);
        }
    }
    swap(i, j) {
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
}
