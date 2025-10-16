// Exercise 3: Error Handling with Custom Errors

// TODO: Create a custom error class and use it inside an async function.

class ApiError extends Error {
   statusCode: number;
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        //   this.name = "ApiError";
        // Object.setPrototypeOf(this, ApiError.prototype);

    }
}

const fetchDataWithError = async (shouldFail: boolean): Promise<string>=>{
    if (shouldFail) {
        throw new ApiError("Failed to fetch data", 500);
    }

    return "Data fetched successfully";
}

const run = async () => {
  try {
    const result = await fetchDataWithError(true);
    console.log("✅ Result:", result);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`🚨 ApiError caught! Status: ${error.statusCode}, Message: ${error.message}`);
    } else {
      console.error("❌ Unknown error:", error);
    }
  }
};

run();