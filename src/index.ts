import setupAPI from "./api/index";
import setupMongo from "./database/setup";

async function setup(): Promise<void> {
  await setupMongo();
  await setupAPI();
}
void setup();
