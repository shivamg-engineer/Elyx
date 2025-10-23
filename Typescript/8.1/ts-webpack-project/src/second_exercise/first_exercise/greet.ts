export function greet(name: string | string[]): string | string[] {
    if (Array.isArray(name)) {
        return name.map((name) => `Hello, ${name}`)
    }else {
    return `Hello, ${name}`;
  }
}
