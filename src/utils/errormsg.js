const errors = {
  'User with username test existed': '用户名已存在，请输入其他用户名！',
  'User with email test existed': '邮箱已被其他账号使用！',
  'User with phone test existed': '电话已被其他账号使用！'
}

export const getMsg = (error) => {
  const result = errors[error]
  if (!result) {
    return error
  }
  return result
}
