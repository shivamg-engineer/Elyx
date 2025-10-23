export default function greet(name) {
    if (Array.isArray(name)) {
        return name.map((name) => `Hello, ${name}`);
    }
    else {
        return `Hello, ${name}`;
    }
}
//# sourceMappingURL=greet.js.map