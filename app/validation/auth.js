const Joi = require('joi');

const login = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
  device_token: Joi.string().required(),
  device_id: Joi.string().required(),
  device_type: Joi.string().required()
});


// const verifyOtp = Joi.object({
//   email: Joi.string().email().required(),
//   otp: Joi.string().length(process.env.OTP_DIGIT * 1).message(`Otp should be of ${process.env.OTP_DIGIT} digits`).required(),
// });

const forResetPassword = Joi.object({
  new_password: Joi.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ).message(
    'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
  ).min(8).max(20).required()
});

const changePassword = Joi.object({
  old_password: Joi.string().required(),
  new_password: Joi.string().regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  ).message(
    'Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character.'
  ).min(8).max(20).required(),
  logout: Joi.boolean()

});

const forgot = Joi.object({
  email: Joi.string().email().required()
})

module.exports = {
  login,
  // userSignup, signupOtp, verifyOtp, forResetPassword, changePassword, forgot
}