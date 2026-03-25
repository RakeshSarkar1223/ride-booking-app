const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
    const salt =await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

const comparePassword = async (userpass, hashpass) => {
    return await bcrypt.compare(userpass, hashpass);
}


module.exports = {
    hashPassword,
    comparePassword
}