import request from '@/utils/request'

export const register = (accountInfo) => {
  const data = { ...accountInfo }
  return request({
    url: 'api/users/register',
    method: 'post',
    data
  })
}
