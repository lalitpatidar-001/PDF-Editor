const bcrypt = require('bcryptjs');

 const generateHash = (text)=>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(text, salt);
    return hash
};

const compareHash = (text,hashText)=>{
    const result = bcrypt.compareSync(text, hashText); 
    return result
}

module.exports ={
    generateHash,
    compareHash,
}