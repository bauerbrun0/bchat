// Skip Husky install in Docker
if (process.env.HUSKY === "0") {
  process.exit(0);
}
const husky = (await import("husky")).default;
console.log(husky());
