
const { Router } = require('express');
const User = require('../models/user');
const router = Router();
const User2 = require('../models/user2');
const User3 = require('../models/user3');

const express = require('express');
const app = express();
const path = require('path');




// Serve static files from the 'views/partials' directory
app.use('/static', express.static(path.join(__dirname, 'views/partials')));


// Sign-in route
router.get("/signin", (req, res) => {
    return res.render("signin"); // Assuming you have a "signin" view
});

// Sign-up route
router.get("/signup", (req, res) => {
    return res.render("signup"); 
});


// Roter to all extra pages and links
router.get("/img", (req, res) => {
    return res.render("partials/img"); 
});

router.get("/infoimg", (req, res) => {
    return res.render("partials/infoimg");  
});

router.get("/Home", (req, res) => {
    return res.render("partials/home"); 
});

router.get("/Aboutus", (req, res) => {
    return res.render("partials/Aboutus"); 
});

router.get("/AboutWM", (req, res) => {
    return res.render("partials/AboutWM"); 
});

router.get("/Articles", (req, res) => {
    return res.render("partials/Articles"); 
});

router.get("/BuyTrash", (req, res) => {
    return res.render("partials/BuyTrash"); 
});

router.get("/RecycleProducts", (req, res) => {
    return res.render("partials/RecycleProducts"); 
});

router.get("/SellTrash", (req, res) => {
    return res.render("partials/SellTrash"); 
});

router.get("/Service", (req, res) => {
    return res.render("partials/Service"); 
});

router.get("/Typeswaste", (req, res) => {
    return res.render("partials/Typeswaste"); 
});



router.get("/confirmationpage",  (req, res) => {
    const orderId = req.query.orderId; // Get the order ID from the query parameters
    const totalAmount = req.query.totalAmount; // Get the total amount from the query parameters
    // Render the confirmation page and pass orderId and totalAmount to the template
    res.render("partials/confirmationpage", { orderId, totalAmount });
});

// Confirmation page route
router.get("/confirmationpage", async (req, res) => {
    try {
        const { orderId, totalAmount, name, address } = req.query;

        // Find the user by name or any other unique identifier
        const user = await User.findOne({ fullName: name });

        if (!user) {
            return res.status(404).send("User not found");
        }

        // Update the user's address
        user.address = address;
        await user.save();

        // Render the confirmation page with the order details
        return res.render("partials/confirmationpage", { orderId, totalAmount });
    } catch (error) {
        console.error("Error updating user address:", error);
        return res.status(500).send("Internal Server Error");
    }
});

router.get("/track", (req, res) => {
    return res.render("partials/track"); 
});
//
router.post("/signin",async(req,res) =>{
    const { email, password } = req.body;
    console.log(email,password);
    const user = await User.matchPassword(email,password);

    console.log('User',user);
    return res.redirect("/");


});



// Sign-up form submission route
router.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // Create a new user
        await User.create({
            fullName,
            email,
            password
        });
        return res.redirect("/"); // Redirect to the home page
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});
//

// Sign-up form submission route
router.post("/SellTrash", async (req, res) => {
    const { wasteType, quantity, price } = req.body;
    try {
        // Create a new user
        await User2.create({
            wasteType,
            quantity,
            price
        });
        return res.redirect("/"); // Redirect to the home page
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});

// Sign-up form submission route
router.post("/infoimg", async (req, res) => {
    const { image, address,city,state,pincode,landmark,phone,wasteType,imageDescription } = req.body;
    
    try {
        // Create a new user
        await User3.create({

            image,
            address,
            city,
            state,
            pincode,
            landmark,
            phone,
            wasteType,
            imageDescription
        });
        return res.redirect("/"); // Redirect to the home page
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Error creating user");
    }
});
module.exports = router;
