const bcrypt = require('bcryptjs');
const saltRounds = 10;


const hashPassword = async(password) => {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword
}

const comparePassword = async(password, passwordToCompare) => {
    try {
        const isMatch = await bcrypt.compare(password, passwordToCompare);
        return isMatch; // Returns true if they match, false otherwise
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false;
    }
}

module.exports = {hashPassword, comparePassword}