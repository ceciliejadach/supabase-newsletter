export async function wait(ms) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}
