import db from '../models'

//lấy hết CATEGORY trong db bằng api
export const getCategoriesSerivce = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,

        })
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Không nhận được category trong services.' + error,
            response
        })
    } catch (error) {
        reject(error)
    }
})