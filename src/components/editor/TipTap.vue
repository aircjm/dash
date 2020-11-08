<template>
  <quasar-tiptap
    v-bind="options"
    @update="onUpdate"
  />
</template>

<script>
import { Placeholder, Image } from 'tiptap-extensions'
import { QuasarTiptap, RecommendedExtensions } from 'quasar-tiptap'
import 'quasar-tiptap/lib/index.css'
import { uploadImage } from 'src/api/file'
export default {
  name: 'TipTap',
  data () {
    return {
      options: {
        content: '',
        editable: true,
        showToolbar: true,
        showBubble: true,
        extensions: [
          ...RecommendedExtensions,
          new Placeholder({
            showOnlyCurrent: false,
            emptyNodeText: node => {
              if (node.type.name === 'title') {
                return 'Title'
              }
              return 'Content'
            }
          }),
          new Image({
            uploadRequest (file) {
              debugger
              // 如果接口要求 Content-Type 是 multipart/form-data，则请求体必须使用 FormData
              const fd = new FormData()
              fd.append('image', file)
              // 第1个 return 是返回 Promise 对象
              // 为什么？因为 axios 本身就是返回 Promise 对象
              return uploadImage(fd).then(res => {
                // 这个 return 是返回最后的结果
                // return res.data.data.url
                return 'https://avatars2.githubusercontent.com/u/18283183?s=460&u=8236fdf92f0582abb340087cb938322587c82e7f&v=4'
              })
            } // 图片的上传方法，返回一个 Promise<url>
          })
        ],
        toolbar: [ // 1.name 2.object 3.component
          {
            name: 'add-more', // use object with options
            type: 'menu',
            options: {
              embed: {
                video: ['youtube', 'bilibili', 'youku'],
                map: ['google_map', 'amap', 'baidu_map'],
                design: ['modao', 'lanhu', 'figma', 'canva', 'processon'],
                develop: ['codepen'],
                data: ['google_forms', 'jinshuju'],
                others: ['iframe']
              }
            }
          },
          'separator',
          'bold',
          'italic',
          {
            name: 'text-format-dropdown',
            type: 'menu',
            options: {
              list: [
                'underline',
                'strike',
                'code'
              ]
            }
          },
          'separator',
          'font-family',
          'fore-color',
          'back-color',
          'format_clear',
          'separator',
          'align-dropdown',
          'indent-dropdown',
          'line-height',
          'separator',
          'horizontal',
          'list-dropdown',
          'separator',
          'blockquote',
          'code_block',
          'link',
          // OLinkBtn, // use custom component
          'photo',
          'table',
          'separator',
          'print'
        ],
        bubble: [
          'bold',
          'italic',
          'separator',
          'font-family',
          'fore-color',
          'back-color',
          'separator',
          'link',
          'separator',
          'align-group'
        ]
      },
      json: '',
      html: ''
    }
  },
  components: {
    QuasarTiptap
  },
  methods: {
    onUpdate ({ getJSON, getHTML }) {
      this.json = getJSON()
      this.html = getHTML()
      // console.log('html', this.html)
      console.log('json', JSON.stringify(this.json))
    }
  },
  mounted () {
    this.$o.lang.set('zh-hans')
    // console.log('editor', this.$refs.editor.editor)
  },
  deactivated () {
  },
  beforeDestroy () {
  }
}
</script>

<style lang="stylus">

</style>
