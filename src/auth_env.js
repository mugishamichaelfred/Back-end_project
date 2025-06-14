const crypto = require('crypto');
const fs = require('fs');

// Function to generate JWT secret
function generateJWTSecret() {
    return crypto.randomBytes(32).toString('hex');
}

// Countdown Timer for 1 hour (3600 seconds)
let countdown = 3600; // 1 hour in seconds

const timerInterval = setInterval(() => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;

    countdown--;
    
    if (countdown < 0) {
        clearInterval(timerInterval);
        // Generate a new JWT Secret after 1 hour
        const newSecret = generateJWTSecret();
        console.log(newSecret);
    
    // Write the new secret to .env file
        fs.writeFileSync('../.env', `JWT_SECRET=${newSecret}\n`);
    }
}, 1000);

// Generate an initial JWT Secret and log it
const initialSecret = generateJWTSecret();

// Optionally, save the initial secret to the .env file
fs.writeFileSync('../.env', `JWT_SECRET=${initialSecret}\n`);
