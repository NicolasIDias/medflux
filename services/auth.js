export let userId = null

export async function setUserId(id) {
  userId = id
}

export async function getUserId() {
  return userId
}