function calculateMinCost() {
  //your code here
  const inputElement = document.getElementById('inputRopes'); 
  const resultElement = document.getElementById('result'); 
  const input = inputElement.value; 
  const ropeLengths = input.split(',').map(Number); 
  const minHeap = new MinHeap();

  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  let totalCost = 0;

  
  while (minHeap.size() > 1) {
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();

    const cost = min1 + min2;

    totalCost += cost;

    minHeap.insert(cost);
  }

  const finalRope = minHeap.extractMin();

  // Display the minimum cost in the result element
  resultElement.innerHTML = `Minimum Cost: ${totalCost + finalRope}`;
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.size() === 0) {
      return null;
    }

    if (this.size() === 1) {
      return this.heap.pop();
    }

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let currentIndex = this.size() - 1;

    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);

      if (this.heap[currentIndex] < this.heap[parentIndex]) {
        [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
        currentIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let currentIndex = 0;

    while (true) {
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      let smallestIndex = currentIndex;

      if (
        leftChildIndex < this.size() &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < this.size() &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === currentIndex) {
        break;
      }

      [this.heap[currentIndex], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[currentIndex]];
      currentIndex = smallestIndex;
    }
  }
}