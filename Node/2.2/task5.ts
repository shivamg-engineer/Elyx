import { promises as fs } from "fs";

async function saveData(filePath: string, data: any): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

async function loadData(filePath: string): Promise<any> {
  const data = await fs.readFile(filePath, "utf-8");
  return JSON.parse(data);
}
const data = { name: "John Doe", age: 30 };

saveData("data.json", data).then(() => console.log("Data saved!"));
loadData("data.json").then((data)=>console.log(data));