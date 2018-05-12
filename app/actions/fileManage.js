import * as api from 'api'
import * as types from 'config/types'


function updateUserAvatar(avatar) {
    return {
        type: types.UPDATE_USER_AVATAR,
        avatar: avatar
    }
}

export const uploadAvatar = (data) => {

    return (dispatch, getState) => {

        return api.uploadAvatar(data).then(function (response) {
            if (response.data.success === false && response.data.msg === '未登录') {
                return dispatch(push('/login'))
            }
            if (response.data.success) {
                dispatch(updateUserAvatar(response.data.avatar))
            }


        });
    }
}

