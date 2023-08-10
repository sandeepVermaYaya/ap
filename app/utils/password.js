const bcrypt = require('bcrypt');
let saltRounds = process.env.SALT_ROUND;



exports.generateHash = async (password) => {

    try {
        saltRounds = parseInt(saltRounds);
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password.toString(), salt);
        return hash;
    }
    catch (err) {
        return err;
    }

};

exports.generateRandomPass = async () => {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%&*_+-';
    const string_length = 10;
    let randomstring = '';
    for (let i = 0; i < string_length; i++) {
      const rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
  
    return randomstring;
  };

// you can compare hash otp by below function
exports.comparePassword = (password, hash) => bcrypt.compareSync(password, hash);




