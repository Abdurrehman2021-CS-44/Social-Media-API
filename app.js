const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose")

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1/socialMediaDB")

const profileSchema = new mongoose.Schema({
    id: String,
    username: String,
    email: String,
    name: String,
    birthdate: Date,
    location: String,
    bio: String,
    website: String,
    social: {
        twitter: String,
        instagram: String,
        linkedin: String
    }
});

const Profile = new mongoose.model("profile", profileSchema);

const profile = new Profile({
    id: "12345",
    username: "abdurrehman1359",
    email: "abdurrehmanbinfaheem@gmail.com",
    name: "Abdur Rehman Khan",
    birthdate: new Date(2003, 2, 27),
    location: "Pakistan",
    bio: "Allah is the creator",
    website: "http://www.abdurrehman.com",
    social: {
        twitter: "aBdUrReHmAm",
        instagram: "abdurrehman673",
        linkedin: "Abdurrehman Bin Faheem"
    }
});

profile.save()
.then(()=>{
    console.log("Profile saved successfully");
})

app.route("/profiles")
.get((req, res) =>{ 

})

app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})