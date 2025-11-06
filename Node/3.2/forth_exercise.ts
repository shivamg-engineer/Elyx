// Implement an async queue processor that executes multiple tasks sequentially.

// Define a generic type for async tasks (functions returning a Promise)
type AsyncTask = () => Promise<void>;

async function processQueue(tasks: AsyncTask[]): Promise<void> {
  console.log("🚀 Starting async queue processing...");
 var i:number=1;
  for (const task of tasks) {
    try {
      console.log(`➡️ Executing task ${i} of ${tasks.length}`);
      await task(); // Wait for each task to complete before next one
      console.log(`✅ Task ${i} completed`);
    } catch (error: any) {
      console.error(`Task ${i} failed: ${error.message}`);
    }
    i=i+1;
  }

  console.log("🏁 All tasks processed.");
}

// Example tasks to test the queue
const tasks: AsyncTask[] = [
  async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Task 1: Fetching user data...");
  },
  async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log("Task 2: Processing payment...");
  },
  async () => {
    await new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Payment failed")), 800)
    );
  },
  async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    console.log("Task 4: Sending email notification...");
  },
];

// Run the queue processor
processQueue(tasks);