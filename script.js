function calculateMinCost() {
  const inputElement = document.getElementById("rope-lengths");
  const inputText = inputElement.value;
  const ropeLengths = inputText.split(",").map(Number);

  if (ropeLengths.length < 2) {
    alert("Please enter at least two rope lengths separated by commas.");
    return;
  }

  let totalCost = 0;
  const priorityQueue = new MinHeap();

  ropeLengths.forEach((length) => {
    priorityQueue.insert(length);
  });

 while (priorityQueue.size() > 1) {
    const shortest1 = priorityQueue.extractMin();
    const shortest2 = priorityQueue.extractMin();
    const cost = shortest1 + shortest2;
    totalCost += cost;
    priorityQueue.insert(cost);
  }

  const resultElement = document.getElementById("result");
  resultElement.innerText = `Minimum Cost: ${totalCost}`;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let currentIndex = this.heap.length - 1;
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      if (this.heap[currentIndex] < this.heap[parentIndex]) {

        [this.heap[currentIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currentIndex],
        ];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  extractMin() {
    if (this.heap.length === 0) {
      return null;
    }
    if (this.heap.length === 1) {
      return this.heap.pop();
    }

    const minValue = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapify(0);
    return minValue;
  }

  heapify(index) {
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    let smallestIndex = index;

    if (
      leftChildIndex < this.heap.length &&
      this.heap[leftChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }

    if (
      rightChildIndex < this.heap.length &&
      this.heap[rightChildIndex] < this.heap[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }

    if (smallestIndex !== index) {
      [this.heap[index], this.heap[smallestIndex]] = [
        this.heap[smallestIndex],
        this.heap[index],
      ];
      this.heapify(smallestIndex);
    }
  }

  size() {
    return this.heap.length;
  }
}
