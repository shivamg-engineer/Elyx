// Exercise 1: API Server with JSON Response

// Modify the HTTP server to return a JSON response instead of plain text.

import { createServer, IncomingMessage, ServerResponse } from "http";

const server = createServer((req: IncomingMessage, res: ServerResponse)=>{

    if (req.method === "GET" && req.url === "/") {
    // Example JSON response
    const responseData = {
      message: "Hello, world!",
      status: "success"
    };

    // Set headers for JSON response
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");

    // Send the JSON response
    res.end(JSON.stringify(responseData));
  } else {
    // Handle other routes
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not Found" }));
  }
})

// Start the server
const PORT = 8000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 