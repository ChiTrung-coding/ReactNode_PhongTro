import * as inserService from '../services/insert'

export const insert = async (req, res) => {
    try {
        //  console.log('Request body:', req.body); // Kiểm tra dữ liệu đầu vào
        const response = await inserService.createPricesAndAreas(req.body)
        return res.status(200).json(response)
    } catch (error) {
        console.error('Error in insert controller:', error);
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại ở controller server: ' + error
        })
    }
}