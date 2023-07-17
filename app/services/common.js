const db = require('../models/index')



exports.getList = async (model, condition, attributes, limit, offset, order) => {
    try {
        let list = await model.findAndCountAll({
            ...condition !== undefined && {
                where: condition
            },
            ...attributes !== undefined && {
                attributes
            },
            ...limit !== undefined && {
                limit
            },
            ...offset !== undefined && {
                offset
            },
            ...order !== undefined && {
                order
            },

        });
        return list ? JSON.parse(JSON.stringify(list)) : false;

    } catch (error) {
        return false
    }
}

exports.addDetail = async (model, data, transaction) => {
    try {
        //   console.log(data);
        const addAuthInfo = await model.create(data, { transaction });

        return addAuthInfo ? JSON.parse(JSON.stringify(addAuthInfo)) : false;
    }
    catch (error) {
        console.error('AddAuthDetail>>>>>>>>>', error);
        return false;
    }
};

exports.updateData = async (model, data, condition, transaction) => {
    try {
        console.log('condition', condition);
        const result = await model.update(data, { where: condition }, { transaction });
        return result ? result : false;
    } catch (error) {

        console.log('errrror>>>>>>>', error);
        return false;
    }
}

exports.findByCondition = async (model, condition) => {
    try {
        console.log('model is ', model);
        console.log('condtion', condition)
        const data = await model.findOne(
            { where: condition }
        )
        console.log("🚀 ~ file: common.js ~ line 63 ~ findByCondition ~ data", data)

        return data ? JSON.parse(JSON.stringify(data)) : false
    } catch (error) {
        console.log('err>>>>>>>>>>>>>> in find', error);
        return false
    }
}

exports.deleteQuery = async (model, condition, transaction, force = false) => {
    try {
        const data = await model.destroy(
            { where: condition, force: force },
            { transaction }
        )

        return data ? JSON.parse(JSON.stringify(data)) : false
    } catch (error) {

        return false

    }
}

exports.count = async (model, condition) => {
    try {
        const total = await model.count({ where: condition })
        return total ? JSON.parse(JSON.stringify(total)) : 0

    } catch (error) {
        return false

    }
}

exports.getAuthDetail = async (model, condition) => {
    try {
        const { Auth } = await db.sequelize.models;
        const result = await model.findOne({
            attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] },
            include: [
                {
                    model: Auth,
                    attributes: { exclude: ['created_at', 'updated_at', 'deleted_at'] }
                },
            ],
            where: condition,
            // raw: true
        }
        );

        return result ? JSON.parse(JSON.stringify(result)) : false;

    } catch (error) {
        console.log('error>>', error);
        return false;

    }
}
