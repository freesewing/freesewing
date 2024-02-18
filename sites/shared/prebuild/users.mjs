import axios from 'axios'

export const loadUserInfo = async (id) => {
  let result
  try {
    result = await axios.get(`https://backend3.freesewing.org/users/${id}`)
  } catch (err) {
    console.log(err)
  }

  return result.data
    ? {
        bio: result.data.profile.bio,
        id: result.data.profile.id,
        ihash: result.data.profile.ihash,
        role: result.data.profile.role,
        username: result.data.profile.username,
      }
    : false
}
