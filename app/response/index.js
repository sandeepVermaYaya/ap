/* eslint-disable no-console */
const httpStatus = require('http-status');

exports.success = (result, res, code, dbTrans) => {
  try {
    const response = {
      success: true,
      status_code: code,
      message: result.msgCode || httpStatus[code],
      result: result.data ? result.data : '',
      time: Date.now()
    };

    if (dbTrans !== undefined) {
      dbTrans.commit()
    }
    res.status(code).json(response);

  }
  catch (error) {

    console.log(error);
    return res.json({
      success: true,
      status_code: 500,
      message: 'Internal Server Error.',
      result: '',
      time: Date.now()
    });
  }
};

exports.error = (error, res, code, dbTrans) => {
  try {
    const response = {
      success: false,
      status_code: code,
      message: error.msgCode || httpStatus[code],
      result: {
        error: error.data ? error.data : 'error'
      },
      time: Date.now()
    };
    if (dbTrans !== undefined) {
      dbTrans.rollback()
    }
    res.status(code).json(response);
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      status_code: 500,
      message: 'Internal Server error.',
      result: '',
      time: Date.now()
    });
  }
};

