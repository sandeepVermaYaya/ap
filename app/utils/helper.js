const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('../models');
const mail = require('nodemailer');
const moment = require('moment')


exports.genUUID = () => {
    const uuid = uuidv4();
    return uuid;
};

exports.generateOtp = (digit) => {
    const otp = Math.floor(
        10 ** (digit - 1) + Math.random() * (10 ** (digit - 1) * 9)
    );
    return otp;
};

transporter = mail.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

exports.sendMail = (email, sendData, subject, textTemplate) => {
    try {
        // eslint-disable-next-line no-undef
        renderFile(`${appRoot}/public/mailTemplate/${textTemplate}`, sendData, (err, dataTemplate) => {
            if (err) {
                console.log(err);
            }
            else {
                const mainOptions = {
                    from: process.env.SMTP_EMAIL,
                    to: email,
                    subject,
                    html: dataTemplate
                };
                transporter.sendMail(mainOptions, (info) => {
                    if (err) {
                        console.log(err);
                        // return callback(err, null);
                    }
                    console.log(info)
                        ;
                    // return callback(null, info);
                });
            }
        });
    }
    catch (error) {
        console.log('---Email Error--', error);
        return false;
    }
};

exports.getPagination = (page, size) => {
    const limit = size ? size : 10;
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
};


// convert local time to another timezone
exports.convertLocalToTimezone = (localDt, timezone, localDtFormat = null) => {
    return moment(localDt, localDtFormat).tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
}


exports.convertLocalToUTC = (dt, dtFormat) => {
    return moment(dt, dtFormat).utc().format('YYYY-MM-DD hh:mm:ss A');
}

exports.convertUTCToTimezone = (utcDt, utcDtFormat, timezone) => {
    return moment.utc(utcDt, utcDtFormat).tz(timezone).format('YYYY-MM-DD hh:mm:ss A');
}
