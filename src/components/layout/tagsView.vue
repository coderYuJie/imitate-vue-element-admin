<template>
  <div class="tags-view">
    <el-scrollbar ref="scrollContainer" class="tags-container" @wheel.native.prevent="handleScroll">
      <router-link
      ref="tag"
      v-for="tag in visitedViews"
      :key="tag.path"
      class="tag-item"
      :class="isActive(tag) ? 'active':''"
      tag="span"
      @click.right.prevent.native="openMenu(tag,$event)"
      :to="{ path:tag.path }">
      {{ generateTitle(tag.meta.title) }}
      <span v-if="!isAffix(tag)" @click.prevent.stop="closeSelectTag(tag)" class="el-icon-close tag-close"></span>
      </router-link>
    </el-scrollbar>
    <ul ref="menu" v-show="showMenu" class="menu" :style="{'left': left,'top': top}">
      <li @click="refreshTag(selectedTag)" class="menu-item">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click='closeSelectTag(selectedTag)' class="menu-item">关闭当前</li>
      <li @click="closeOtherTags(selectedTag)" class="menu-item">关闭其他</li>
      <li @click="closeAllTags(selectedTag)" class="menu-item">关闭全部</li>
    </ul>
  </div>
</template>

<script>
import path from 'path'
import generateTitle from '@/utils/i18n'
const tagSpacing = 5
export default {
  data () {
    return {
      selectedTag: null,
      left: 0,
      top: 0,
      showMenu: false,
      affixTags: []
    }
  },
  computed: {
    scrollWrapper () {
      return this.$refs.scrollContainer.$refs.wrap
    },
    routes () {
      return this.$store.state.verify.routes
    },
    visitedViews () {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    $route () {
      this.addTags()
      this.moveToCurrentTag()
    },
    showMenu (val) {
      if (val) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    generateTitle,
    // 滚轮控制tagsView横向滚动条
    handleScroll (e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40
      const $scrollWrapper = this.scrollWrapper
      $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
      this.closeMenu()
    },
    // 过滤有固钉的路由
    filterAffixTags (routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length > 0) {
            tags = [...tags, ...tempTags]
          }
        }
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            path: tagPath,
            fullPath: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
      })
      return tags
    },
    // 关闭选中tag
    closeSelectTag (tag) {
      this.$store.dispatch('tagsView/delView', tag).then(({ visitedViews }) => {
        if (this.isActive(tag)) {
          this.toLastTag(visitedViews, tag)
        }
      })
    },
    // 初始化 tagsView 数组
    initTagsView () {
      const affixTags = this.filterAffixTags(this.routes)
      this.affixTags = affixTags
      affixTags.forEach(tag => {
        this.$store.dispatch('tagsView/addView', tag)
      })
    },
    toLastTag (visitedViews, tag) {
      const lastTag = visitedViews.filter(v => v.path === visitedViews[visitedViews.length - 1].path)[0]
      if (lastTag) {
        this.$router.push(lastTag.fullPath)
      } else {
        if (tag.name === 'Dashboard') {
          this.$router.replace({ path: '/redirect' + tag.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    isActive (tag) {
      return tag.path === this.$route.path
    },
    isAffix (tag) {
      return tag && tag.meta && tag.meta.affix
    },
    addTags () {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
    },
    openMenu (tag, e) {
      const minMenuWidth = 100
      const left = e.clientX - this.$el.getBoundingClientRect().left + 10
      const top = e.clientY - this.$el.getBoundingClientRect().top + 10
      const maxWidth = this.$el.offsetWidth - minMenuWidth
      if (left > maxWidth) {
        this.left = maxWidth + 'px'
      } else {
        this.left = left + 'px'
      }
      this.top = top + 'px'
      this.showMenu = true
      this.selectedTag = tag
    },
    closeMenu () {
      this.showMenu = false
    },
    refreshTag (tag) {
      this.$router.replace('/redirect' + tag.path)
    },
    closeOtherTags (tag) {
      this.$router.push(tag)
      this.$store.dispatch('tagsView/closeOtherTags', tag)
    },
    closeAllTags (tag) {
      this.$store.dispatch('tagsView/closeAllTags').then((res) => {
        if (this.affixTags.some(t => t.path === tag.path)) {
          if (this.$route.path === tag.path) {
            return
          }
        }
        this.toLastTag(res)
      })
    },
    moveToCurrentTag () {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        tags.forEach(v => {
          if (v.to.path === this.$route.path) {
            const $container = this.$refs.scrollContainer.$el
            const $scrollWrapper = this.scrollWrapper
            const currentTagIndex = tags.findIndex(item => item === v)
            const containerWidth = $container.offsetWidth
            const scrollWrapperWidth = $scrollWrapper.scrollWidth

            if (currentTagIndex === 0) {
              // 激活的是第一个
              $scrollWrapper.scrollLeft = 0
            } else if (currentTagIndex === (tags.length - 1)) {
              // 激活的是最后一个
              $scrollWrapper.scrollLeft = scrollWrapperWidth - containerWidth
            } else {
              const nextTag = tags[currentTagIndex + 1].$el
              const prevTag = tags[currentTagIndex - 1].$el
              if ((nextTag.offsetLeft + nextTag.offsetWidth) > (containerWidth + $scrollWrapper.scrollLeft)) {
                // 处理后边界
                $scrollWrapper.scrollLeft = (nextTag.offsetLeft + nextTag.offsetWidth) - containerWidth + tagSpacing
              } else if (prevTag.scrollLeft < $scrollWrapper.scrollLeft) {
                // 处理前边界
                $scrollWrapper.scrollLeft = prevTag.offsetLeft - tagSpacing
              }
            }
          }
        })
      })
    }
  },
  mounted () {
    this.initTagsView()
    this.addTags()
  }
}
</script>

<style lang="scss" scoped>
.tags-view {
  position: relative;
  height: 40px;
  padding-top: 8px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .tags-container {
    position: relative;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    ::v-deep {
    .el-scrollbar__bar {
      bottom: 0px;
    }
      /deep/.el-scrollbar__wrap {
        height: 50px;
        .tag-item {
          display: inline-block;
          height: 22px;
          font-size: 12px;
          line-height: 20px;
          padding: 0 8px;
          border: 1px solid #ccc;
          margin: 0 5px;
          cursor: pointer;
          &.active {
            background-color: #42b983;
            color: #fff;
            border-color: #42b983;
            &::before {
              display: inline-block;
              content: '';
              width: 8px;
              height: 8px;
              border-radius: 50%;
              background-color: #fff;
            }
          }
          .tag-close {
            font-size: 12px;
            width: 14px;
            height: 14px;
            text-align: center;
            line-height: 14px;
            border-radius: 50%;
            vertical-align: middle;
            &:hover {
              background-color: #b4bccc;
              color: fff;
            }
          }
        }
      }
    }
  }
  .menu {
    position: absolute;
    min-width: 100px;
    background-color: #fff;
    box-shadow: 2px 2px 3px 0 rgba(0,0,0,.3);;
    padding: 10px 0;
    border-radius: 5px;
    z-index: 9999;
    .menu-item {
      font-size: 14px;
      padding: 5px 10px;
      cursor: pointer;
      &:hover {
        background-color: #eee;
      }
    }
  }
}
</style>
