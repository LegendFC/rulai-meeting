import * as userService from '../services/user'

export default {
  namespace: 'user',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'fetch'
      })
    }
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      try {
        const {
          data: { data }
        } = yield call(userService.getUserInfo)
        yield put({ type: 'save', payload: { ...data } })
      } catch (error) {
        console.log('*fetch', error)
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload }
    }
  }
}
