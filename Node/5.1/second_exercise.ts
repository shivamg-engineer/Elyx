// Pagination & Filtering

// Add /users endpoint with ?page=1&pageSize=10 support.

// TODO: Implement query parameters for filtering by name or role.

import express from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";

interface User {
  id: number;
  name: string;
  role: string;
}

const app = express();

app.use(bodyParser.json());
let users: User[] = [
  { id: 1, name: "Alice", role: "admin" },
  { id: 2, name: "Bob", role: "user" },
  { id: 3, name: "Charlie", role: "user" },
  { id: 4, name: "David", role: "moderator" },
  { id: 5, name: "Eve", role: "admin" },
  // Add more users for testing
];

let nextId = users.length + 1;

app.get("/users", (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const pageSize = Number(req.query.pageSize) || 10;
  const nameFilter = (req.query.name as string)?.toLowerCase() || "";
  const roleFilter = (req.query.role as string)?.toLowerCase() || "";

  //filter users by name and role
  let filteredUsers = users.filter((user) => {
    const matchName = nameFilter
      ? user.name.toLowerCase().includes(nameFilter)
      : true;

    const matchRole = roleFilter
      ? user.role.toLowerCase().includes(roleFilter)
      : true;

    return matchName && matchRole;
  });

  // Pagination
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedUsers = filteredUsers.slice(start, end);
 // Well-structured response
  const response = {
    meta: {
      page,
      pageSize,
      totalItems: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / pageSize),
      filters: {
        name: nameFilter || null,
        role: roleFilter || null,
      },
    },
    data: paginatedUsers,
  };

  res.json(response);
});

// Default route
app.get("/", (req: Request, res: Response) => {
  res.send("User API is running!");
});

// Start server
const port = 8080;
app.listen(port, () => {
  console.log(`User API running at http://localhost:${port}`);
});
