import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  console.log('getAll')
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, setToken, create, update, deleteBlog }