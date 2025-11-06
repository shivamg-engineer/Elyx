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

        if (!task) {
            console.error(`Task with ID ${id} not found.`);
            return;
        }

        if (task.completed) {
            console.warn(` Task "${task.title}" is already completed.`);
            return;
        }

        task.completed = true;
        console.log(` Task completed: "${task.title}"`);
        this.emit('taskCompleted', task);
    }

    listTasks(): void {
        console.log('\nCurrent Tasks:');
        this.tasks.forEach(t => {
            console.log(`- [${t.completed ? '✔' : ' '}] ${t.id}: ${t.title}`);
        });
        console.log('');
    }
}

// ------------------------------
// Example usage
// ------------------------------
const manager = new TaskManager();

// Register event listeners
manager.on('taskAdded', (task) => {
    console.log(` Event: Task "${task.title}" was added.`);
});

manager.on('taskCompleted', (task) => {
    console.log(` Event: Task "${task.title}" marked as completed.`);
});

// Simulate usage
manager.addTask('Finish Node.js exercise');
manager.addTask('Write TypeScript notes');
manager.listTasks();

setTimeout(() => {
    manager.completeTask(1);
    manager.listTasks();
}, 2000);
