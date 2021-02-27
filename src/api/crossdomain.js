import request from '@/utils/request'

export function crossDomainPost(params) {
  return request({
    url: '/crossDomainPost',
    method: 'post',
    data: params
  })
}

