import * as authService from '../services/auth'


//tạo tài khoản bên auth routes
export const register = async (req, res) => {
    const { name, phone, password } = req.body
    try {
        if (!name || !phone || !password) return res.status(400).json({
            // số err tự đặt ( số âm là lỗi server, số dương là lỗi client, err = 0 thì success)
            err: 1,
            msg: 'Vui lòng nhập đầy đủ thông tin!'
        })

        const response = await authService.registerService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực controller thất bại: ' + error
        })
    }
}
//đang nhập bên auth routes
export const login = async (req, res) => {
    const { phone, password } = req.body
    try {
        if (!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng nhập đầy đủ thông tin!'
        })

        const response = await authService.loginService(req.body)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực controller thất bại: ' + error
        })
    }
}