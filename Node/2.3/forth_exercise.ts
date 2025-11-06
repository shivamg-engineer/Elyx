// Handle multiple event listeners for a single event.
import EventEmitter from 'events';

interface Task {
    id: number;
    title: string;
    completed: boolean;
}

class TaskManager extends EventEmitter {
    private tasks: Task[] = [];
    private nextId = 1;

    addTask(title: string): void {
        const task: Task = { id: this.nextId++, title, completed: false };
        this.tasks.push(task);

        console.log(` Task added: "${task.title}"`);
        this.emit('taskAdded', task);
    }

    completeTask(id: number): void {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return;

        task.completed = true;
        console.log(` Task completed: "${task.title}"`);
        this.emit('taskCompleted', task);
    }
}

// ------------------------------
// Example usage with multiple listeners
// ------------------------------
const manager = new TaskManager();

// First listener for taskAdded
manager.on('taskAdded', (task) => {
    console.log(`Listener 1: Task "${task.title}" added.`);
});

// Second listener for taskAdded
manager.on('taskAdded', (task) => {
    console.log(` Listener 2: Logging task "${task.title}" to a file (simulated).`);
});

// Listener for taskCompleted
manager.on('taskCompleted', (task) => {
    console.log(` Listener 1: Task "${task.title}" completed.`);
});

// Second listener for taskCompleted
manager.on('taskCompleted', (task) => {
    console.log(` Listener 2: Sending notification for task "${task.title}".`);
});

// Test
manager.addTask('Finish Node.js assignment');
manager.addTask('Write TypeScript notes');

setTimeout(() => {
    manager.completeTask(1);
}, 1000);
