const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs"); // Import bcrypt
const collection = require("./mongodb");

const templatepath = path.join(__dirname, '../tempelates');

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);  // Hash the password

        const data = {
            name: req.body.name,
            password: hashedPassword,  // Store the hashed password
            role: req.body.role
        };

        await collection.insertMany([data]);
        res.render("home", { role: data.role });
    } catch (err) {
        res.send("Error during signup");
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ name: req.body.name });

        if (user) {
            const isMatch = await bcrypt.compare(req.body.password, user.password);  // Compare hashed passwords
            if (isMatch) {
                if (user.role === 'student') {
                    res.render("home");
                } else if (user.role === 'faculty') {
                    res.render("home");
                }
            } else {
                res.send("Wrong password");
            }
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.send("Error during login");
    }
});

app.listen(3000, () => {
    console.log("port connected");
});
