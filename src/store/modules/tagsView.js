const tagsView = {
  namespaced: true,
  state: () => ({
    visitedViews: [],
    cachedViews: []
  }),
  mutations: {
    ADD_VISITED_VIEW (state, tag) {
      if (state.visitedViews.some(t => t.path === tag.path)) {
        return false
      }
      state.visitedViews.push(tag)
    },
    ADD_CACHED_VIEW (state, tag) {
      if (state.cachedViews.some(t => t.path === tag.path)) {
        return false
      }
      state.cachedViews.push(tag)
    },
    DEL_VISITED_VIEW (state, tag) {
      state.visitedViews = state.visitedViews.filter(t => t.path !== tag.path)
    },
    DEL_CACHED_VIEW (state, tag) {
      state.cachedViews = state.cachedViews.filter(t => t.path !== tag.path)
    },
    CLOSE_OTHER_TAGS (state, tag) {
      state.visitedViews = state.visitedViews.filter(t => (t.path === tag.path) || (t.meta && t.meta.affix))
      state.cachedViews = state.cachedViews.filter(t => (t.path === tag.path) || (t.meta && t.meta.affix))
    },
    CLOSE_ALL_TAGS (state) {
      state.visitedViews = state.visitedViews.filter(tag => tag.meta && tag.meta.affix)
      state.cachedViews = state.cachedViews.filter(tag => tag.meta && tag.meta.affix)
    }
  },
  actions: {
    addView ({ dispatch }, tag) {
      dispatch('addVisitedView', tag)
      dispatch('addCachedView', tag)
    },
    addVisitedView ({ commit }, tag) {
      commit('ADD_VISITED_VIEW', tag)
    },
    addCachedView ({ commit }, tag) {
      console.log(tag)
      if (!tag.meta.noCache) {
        commit('ADD_CACHED_VIEW', tag)
      }
    },
    delVisitedView ({ commit, state }, tag) {
      return new Promise(resolve => {
        commit('DEL_VISITED_VIEW', tag)
        resolve([...state.visitedViews])
      })
    },
    delCachedView ({ commit }, tag) {
      commit('DEL_CACHED_VIEW', tag)
    },
    delView ({ dispatch, state }, tag) {
      return new Promise(resolve => {
        dispatch('delVisitedView', tag)
        dispatch('delCachedView', tag)
        resolve({
          visitedViews: [...state.visitedViews],
          cachedViews: [...state.cachedViews]
        })
      })
    },
    closeOtherTags ({ commit, state }, tag) {
      return new Promise(resolve => {
        commit('CLOSE_OTHER_TAGS', tag)
        resolve([...state.visitedViews])
      })
    },
    closeAllTags ({ commit, state }) {
      return new Promise(resolve => {
        commit('CLOSE_ALL_TAGS')
        resolve([...state.visitedViews])
      })
    }
  }
}
export default tagsView
