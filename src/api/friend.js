import { request } from '../config'

export const getFriend = (params) => request.get('/friends', { params })

export const postFriend = data => request.post('/friends', data)

export const updateFriend = data => request.put('/friend', data)
