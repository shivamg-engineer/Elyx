export async function fetchAsyncValue(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async Value Fetched');
    }, 1000);
  });
}
