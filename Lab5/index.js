import PathParameters from "./PathParameters.js";
import QueryParameters from "./QueryParameters.js";
import WorkingWithModule from "./WorkingWithModule.js";
import WorkingWithObjects from "./WorkingWithObjects.js";
import WorkingWithArrays from "./WorkingWithArrays.js";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default function Lab5(app) {
  app.get("/lab5/welcome", (req, res) => {
    res.send("Welcome to Lab 5");
  });
  app.get("/lab5/module.html", async (req, res) => {
    try {
      const html = await readFile(join(__dirname, "module.html"), "utf8");
      res.send(html);
    } catch (error) {
      res.status(500).send("Error loading page");
    }
  });
  PathParameters(app);
  QueryParameters(app);
  WorkingWithModule(app);
  WorkingWithObjects(app);
  WorkingWithArrays(app);
}
