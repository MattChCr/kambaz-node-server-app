const module = {
  id: "CS5610",
  name: "Web Development",
  description: "Full-stack web development course covering modern frameworks and technologies",
  course: "CS5610"
};

export default function WorkingWithModule(app) {
  const getModule = (req, res) => {
    res.json(module);
  };
  const getModuleName = (req, res) => {
    res.json(module.name);
  };
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
}

