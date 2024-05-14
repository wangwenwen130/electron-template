import { useRequest } from '@/hooks'

const HotelApi = {
  active: '/basic/c/device/activation',
  getToken: '/basic/c/device/refresh/token'
}

export const active = () => {
  return useRequest
    .post({
      url: HotelApi.active
    })
    .then((res) => res.data.data)
}

export const getToken = () => {
  return useRequest
    .get({
      url: HotelApi.getToken
    })
    .then((res) => res.data.data)
}
