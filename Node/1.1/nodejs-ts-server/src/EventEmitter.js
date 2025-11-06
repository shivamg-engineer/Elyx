import { EventEmitter } from "events";
const myEmitter = new EventEmitter();
myEmitter.on('message', (msg) => {
    console.log(`Hello, ${msg.name}. Profession: ${msg.prof}`);
});
myEmitter.emit('message', { name: "shivam", prof: "ful stack dev" });
//# sourceMappingURL=EventEmitter.js.map