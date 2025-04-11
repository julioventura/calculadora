// This file implements the memory functions, allowing users to store, recall, and reset values in memory.

class MemoryManager {
  constructor() {
    this.memory1 = 0;
    this.memory2 = 0;
    this.activeMemory = 1;
  }
  
  store(value) {
    if (this.activeMemory === 1) {
      this.memory1 = value;
    } else {
      this.memory2 = value;
    }
  }
  
  recall() {
    return this.activeMemory === 1 ? this.memory1 : this.memory2;
  }
  
  add(value) {
    if (this.activeMemory === 1) {
      this.memory1 += value;
    } else {
      this.memory2 += value;
    }
  }
  
  clear() {
    if (this.activeMemory === 1) {
      this.memory1 = 0;
    } else {
      this.memory2 = 0;
    }
  }
  
  switchMemory() {
    this.activeMemory = this.activeMemory === 1 ? 2 : 1;
    return this.activeMemory;
  }
  
  getActiveMemory() {
    return this.activeMemory;
  }
  
  getMemoryValue(memoryNumber) {
    return memoryNumber === 1 ? this.memory1 : this.memory2;
  }
}
