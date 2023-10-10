const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname + "/public")));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
//mongoose connection 
mongoose.connect("mongodb+srv://sathishsara1007:Sathish%40111@cluster0.f5vy3xz.mongodb.net/Nexus").then(() => {
    console.log("Connected to Database");
});
//mongoose schema and model 
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});
const userModel = mongoose.model("users", userSchema);
app.get('/', (req, res) => {
    res.render("home", { result: "HELLO" })
})
app.get("/register", (req, res) => {
    res.render("register", { result: "REGISTER NOW" })
})
app.get("/login", (req, res) => {
    res.render("login", { result: "LOG IN" })
})
app.get("/about", (req, res) => {
    res.render("about")
})
app.get("/contact", (req, res) => {
    res.render("contact")
})
app.get("/store", (req, res) => {
    res.render("store")
})
app.post("/register", async (req, res) => {
    const { email, name, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (user) {
        res.render('login', { result: "Already Registered! Please Login" });
    }
    else {
        const newUser = new userModel({
            email: email,
            password: password,
            name: name
        });
        newUser.save();
        res.render("login", { result: "Successfully Registerd! Please Login" });
    }
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
        res.render('register', { result: "User Not Found Please register" })
    }
    else {
        if (user.password !== password) {
            result = "Incorrect Password"
            res.render('login', { result: "Incorrect Password Try Again" })
        }
        else {
            result = "Succesfully Logged In"
            res.render('index', { result: `Welcome ${user.name}` })
        }
    }
})

app.listen(PORT, () => {
    console.log("Listening!");
})

// document.getElementById("q1").


const books = [
    {
        heading: "SO and so - 1",
        desc: "Lorem Epsum Sathish gadu Gypsum",
        pages: "420"
    },
    {
        heading: "Tambulam tadanantharam",
        desc: "Chinthapandu rasam Sathish gadu Awesome",
        pages: "420"
    },
    {
        heading: "New Book - 1",
        desc: "Description for New Book - 1",
        pages: "200"
    },
];

for (let i = 3; i < 30; i++) {
    books.push({
        heading: `Book - ${i}`,
        desc: `Description for Book - ${i}`,
        pages: `${Math.floor(Math.random() * 500) + 100}`
    });
}

app.get("/getBooks",(req,res)=>{
    res.render("books",{bookdata:books});
});