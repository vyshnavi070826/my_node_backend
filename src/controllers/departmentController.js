const Department = require("../models/department");

// Add new department
exports.createDepartment = async (req, res) => {
  try {
    const dept = await Department.create(req.body);
    res.status(201).json(dept);
  } catch (error) {
    console.error(error); // helpful for debugging
    res.status(500).json({ error: error.message });
  }
};

// Get all departments
exports.getDepartments = async (req, res) => {
  try {
    const depts = await Department.find();
    res.status(200).json(depts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};