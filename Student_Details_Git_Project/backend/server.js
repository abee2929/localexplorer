const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
const client = new MongoClient("mongodb://127.0.0.1:27017");

app.use(cors());
app.use(express.json());

let students;

async function startServer() {
    await client.connect();
    students = client.db("StudentDB").collection("students");

    app.get("/students", async (req, res) => {
        try {
            const result = await students.find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray();
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: "Unable to fetch students" });
        }
    });

    app.post("/students", async (req, res) => {
        try {
            const { id, name, department, year } = req.body;

            if (!Number.isInteger(id) || typeof name !== "string" || !name.trim() ||
                typeof department !== "string" || !department.trim() ||
                !Number.isInteger(year) || year < 1 || year > 6) {
                return res.status(400).json({ message: "Enter a valid ID, name, department and year (1-6)." });
            }

            if (await students.findOne({ id })) {
                return res.status(409).json({ message: "Student ID already exists" });
            }

            await students.insertOne({ id, name: name.trim(), department: department.trim(), year });
            res.status(201).json({ message: "Student added successfully" });
        } catch (error) {
            res.status(500).json({ message: "Unable to add student" });
        }
    });

    app.put("/students/:id", async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { id: newId, name, department, year } = req.body;

            if (!Number.isInteger(id) || !Number.isInteger(newId) ||
                typeof name !== "string" || !name.trim() ||
                typeof department !== "string" || !department.trim() ||
                !Number.isInteger(year) || year < 1 || year > 6) {
                return res.status(400).json({ message: "Enter valid student details." });
            }

            const existing = await students.findOne({ id });
            if (!existing) {
                return res.status(404).json({ message: "Student not found" });
            }

            const duplicate = await students.findOne({ id: newId, _id: { $ne: existing._id } });
            if (duplicate) {
                return res.status(409).json({ message: "Student ID already exists" });
            }

            await students.updateOne(
                { _id: existing._id },
                { $set: { id: newId, name: name.trim(), department: department.trim(), year } }
            );

            res.json({ message: "Student updated successfully" });
        } catch (error) {
            res.status(500).json({ message: "Unable to update student" });
        }
    });

    app.delete("/students/:id", async (req, res) => {
        try {
            const result = await students.deleteOne({ id: Number(req.params.id) });

            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "Student not found" });
            }

            res.json({ message: "Student removed successfully" });
        } catch (error) {
            res.status(500).json({ message: "Unable to remove student" });
        }
    });

    app.listen(3000, () => {
        console.log("Server running at http://localhost:3000");
    });
}

startServer().catch(error => {
    console.error("Could not start server. Check that MongoDB is running.", error.message);
    process.exit(1);
});
