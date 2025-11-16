const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let users = {}; 

app.post("/register", (req, res) => {
    const { email, password } = req.body;

    if (users[email]) {
        return res.json({ success: false, msg: "User already exists" });
    }

    users[email] = {
        password,
        gold: 5000,
        army: 0,
        score: 0
    };

    res.json({
        success: true,
        token: "fake-token-" + email,
        email: email,
        gold: 5000,
        army: 0,
        score: 0
    });
});


app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!users[email] || users[email].password !== password) {
        return res.json({ success: false, msg: "Invalid credentials" });
    }

    const user = users[email];

    res.json({
        success: true,
        token: "fake-token-" + email,
        email: email,
        gold: user.gold,
        army: user.army,
        score: user.score
    });
});

app.post("/save", (req, res) => {
    const { token, email, gold, army, score } = req.body;

    if (token !== "fake-token-" + email) {
        return res.json({ success: false, msg: "Invalid token" });
    }

    if (!users[email]) {
        return res.json({ success: false, msg: "User does not exist" });
    }

    users[email].gold = gold;
    users[email].army = army;
    users[email].score = score;

    console.log("Saved:", users[email]);

    return res.json({ success: true });
});


app.listen(3000, () => console.log("Server running on http://localhost:3000"));
