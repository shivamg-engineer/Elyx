// Objective: Implement a simple HTTP server using Node.js with TypeScript.
import * as http from 'http';
const server = http.createServer((req, res) => {
    // Ensure req.url is not undefined
    const url = req.url ?? '/';
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, Node.js with TypeScript!');
    }
    else if (url === '/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'ok' }));
    }
});
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
//# sourceMappingURL=server.js.map