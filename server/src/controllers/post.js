import * as postService from '../services/post'

export const getPosts = async (req, res) => {
    try {
        const response = await postService.getPostsService()
        return res.status(200).json(response)

    } catch (error) {
        // lỗi 500 Lỗi server
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error
        })
    }
}

export const getPostsLimit = async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber })
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error
        })
    }
}

export const getNewPosts = async (req, res) => {
    try {
        const response = await postService.getNewPostService()
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error
        })
    }
}

export const createNewPost = async (req, res) => {
    try {
        const { categoryCode, title, priceNumber, areaNumber, label } = req.body
        const { id } = req.user
        if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label) return res.status(400).json({
            err: 1,
            msg: 'Missing input'
        })



        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error
        })
    }
}

export const getPostsLimitAdmin = async (req, res) => {
    const { page, ...query } = req.query
    const { id } = req.user
    try {
        if (!id) return res.status(400).json({
            err: 1,
            msg: 'Missing input'
        })
        const response = await postService.getPostsLimitAdminService(page, id, query)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error
        })
    }
}


export const updatePost = async (req, res) => {
    const { postId, attributesId, imagesId, overviewId, ...payload } = req.body;
    const { id } = req.user;

    try {
        if (!postId || !id || !attributesId || !imagesId || !overviewId) {
            return res.status(400).json({
                err: 1,
                msg: 'Thiếu các trường bắt buộc'
            });
        }

        const post = await postService.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                err: 1,
                msg: 'Bài đăng không tồn tại'
            });
        }

        if (post.userId !== id) {
            return res.status(403).json({
                err: 1,
                msg: 'Bạn không có quyền cập nhật bài đăng này'
            });
        }

        const response = await postService.updatePost(req.body);
        if (response.err !== 0) {
            return res.status(400).json(response);
        }

        return res.status(200).json(response);

    } catch (error) {
        console.error('Lỗi trong controller updatePost:', error);
        return res.status(500).json({
            err: -1,
            msg: 'Lỗi máy chủ nội bộ'
        });
    }
};

export const deletePost = async (req, res) => {
    const { postId } = req.query
    const { id } = req.user
    try {
        if (!postId || !id) return res.status(400).json({
            err: 1,
            msg: 'Missing input'
        })
        const response = await postService.deletePost(postId)
        return res.status(200).json(response)

    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Xác thực thất bại Post trong Services: ' + error.message,

        })
    }
}

