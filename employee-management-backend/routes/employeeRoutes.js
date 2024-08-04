
const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');


// GET all employees
router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error });
    }
});

// POST a new employee
router.post('/', async (req, res) => {
    const { name, emp_id, address, contact } = req.body;
    const newEmployee = new Employee({ name, emp_id, address, contact });

    try {
        const savedEmployee = await newEmployee.save();
        res.status(201).json(savedEmployee);
    } catch (error) {
        res.status(500).json({ message: 'Error adding employee', error });
    }
});

// GET employee by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await Employee.findById(id);
        if (employee) {
            res.json(employee);
        } else {
            res.status(404).json({ message: 'Employee not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error });
    }
});

module.exports = router;
