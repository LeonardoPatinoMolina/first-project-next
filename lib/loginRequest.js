export const loginValidate = async (formData)=>{
  const response = await fetch('api/auth/login',{
    method: 'POST',
    body: JSON.stringify(formData)
  })
  const data = await response.json()
  return data;
}

export const logaut = async (formData)=>{
  const response = await fetch('api/auth/login',{
    method: 'POST',
    body: JSON.stringify(formData)
  })
  const data = await response.json()
  return data;
}