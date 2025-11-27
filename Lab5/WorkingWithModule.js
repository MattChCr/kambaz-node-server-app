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
  const setModuleName = (req, res) => {
    const { name } = req.params;
    module.name = name;
    res.json(module);
  };
  const getModuleDescription = (req, res) => {
    res.json(module.description);
  };
  const setModuleDescription = (req, res) => {
    const { description } = req.params;
    module.description = description;
    res.json(module);
  };
  app.get("/lab5/module", getModule);
  app.get("/lab5/module/name", getModuleName);
  app.get("/lab5/module/name/:name", setModuleName);
  app.get("/lab5/module/description", getModuleDescription);
  app.get("/lab5/module/description/:description", setModuleDescription);
}

