const Register = require("../models/registers");


const sendToken = async (register, statusCode, res) => {
    console.log("hiiiiiii send token",register)
    try {
        // Assuming generateAuthToken is a method on your user model
        const token = await Register.generateAuthToken();
        console.log("testsss121212121212",token)
        await register.save();  // Save the user with the new token

        // Respond with the token and a success status code
        res.status(statusCode).render("/customer/login", { token });
    } catch (error) {
        // Handle errors and send an error response
        console.error("Error sending token:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = sendToken;
