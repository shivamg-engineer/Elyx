// Implement an Interface: Implement Database interface with methods connect() and disconnect().
interface Database {
  connect(): void;
  disconnect(): void;
}
class MySQLDatabase implements Database {
  connect(): void {
    console.log("Connected to MySQL Database");
  }

  disconnect(): void {
    console.log("Disconnected from MySQL Database");
  }
}
