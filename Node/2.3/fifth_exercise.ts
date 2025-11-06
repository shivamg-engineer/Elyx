// Write a function that returns the count of active listeners.
import EventEmitter from 'events';

class TaskManager extends EventEmitter {
    // Example method to count listeners
    getListenerCount(eventName: string): number {
        // `listenerCount` returns how many listeners are registered for a specific event
        return this.listenerCount(eventName);
    }
}

// ----------------------
// Example usage
// ----------------------
const manager = new TaskManager();

manager.on('taskAdded', (task) => console.log('Listener 1: Task added'));
manager.on('taskAdded', (task) => console.log('Listener 2: Task added'));
manager.on('taskCompleted', (task) => console.log('Listener 1: Task completed'));

// Count listeners
console.log('Active listeners for taskAdded:', manager.getListenerCount('taskAdded')); // 2
console.log('Active listeners for taskCompleted:', manager.getListenerCount('taskCompleted')); // 1
console.log('Active listeners for taskRemoved:', manager.getListenerCount('taskRemoved')); // 0
