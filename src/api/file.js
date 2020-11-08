/**
 * 上传图片
 */
import axios from 'boot/axios'

export const uploadImage = data => {
  return axios({
    method: 'POST',
    url: '/mp/v1_0/user/images',
    data
  })
}
