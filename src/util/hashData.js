const bcrypt = require('bcryptjs');

const HashData = async (data,saltRound = bcrypt.genSalt(10))=>{
    try {
        const hashedData = bcrypt.hash(data, saltRound);
        return hashedData;
    } catch (error) {
        throw error;
    }

}

module.exports = HashData;