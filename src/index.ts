import setupAPI from "./api/setup";
import setupMongo from "./database/setup";

async function setup(): Promise<void> {
  await setupMongo();
  await setupAPI();
}
void setup();
