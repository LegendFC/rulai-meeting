import request from '@/utils/request'

export function getReleasedMeetings({ page = 1, orgId }) {
  return request(`/api/user/search/${page}`, {
    method: 'get',
    body: {
      organizationId: orgId
    }
  })
}
