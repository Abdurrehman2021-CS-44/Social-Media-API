const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

mongoose.connect("mongodb://127.0.0.1/socialMediaDB")
.then(()=>{
    console.log("Database is connected.");
});

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

// profile.save()
// .then(()=>{
//     console.log("Profile saved successfully");
// })

app.route("/profiles")
.get((req, res) =>{ 
    Profile.find({})
    .then((profilesFound)=>{
        res.send(profilesFound)
    })
    .catch((err)=>{
        res.send(err)
    })
})
.post((req, res)=>{
    const {twitter, instagram, linkedin, ...rest} = req.body;
    const profile = new Profile({
        ...rest,
        social: {
            twitter,
            instagram,
            linkedin
        }
    });
    profile.save()
    .then(()=>{
        res.send("Successfully saved");
    })
    .catch((err)=>{
        res.send(err);
    })
})
.delete((req, res)=>{
    Profile.deleteMany({})
    .then(()=>{
        res.send("All profiles has been deleted.")
    })
    .catch((err)=>{
        res.send(err)
    })
});

app.route("/profiles/:specifiedProfile")
.get((req, res)=>{
    let speProfile = _.lowerCase(req.params.specifiedProfile);
    Profile.findOne({username: speProfile})
    .then((profileFound)=>{
        res.send(profileFound);
    })
    .catch((err)=>{
        res.send(err);
    });
})
.put((req, res)=>{
    //update the existing document with updated data from request body and save it to database
    const {twitter, instagram, linkedin, ...rest} = req.body;

    const profile = {
        ...rest,
        social: {
            twitter,
            instagram,
            linkedin
        }
    }

    Profile.replaceOne({username: req.params.specifiedProfile}, {...profile})
    .then(()=>{
        res.send("Successfully replaced the specified profile with the given object");
    })
    .catch((err)=>{
        res.send(err);
    });
})




app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})