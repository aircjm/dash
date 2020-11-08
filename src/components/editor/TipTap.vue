<template>
  <quasar-tiptap
    v-bind="options"
    @update="onUpdate"
  />
</template>

<script>
import { Placeholder } from 'tiptap-extensions'
import { QuasarTiptap, RecommendedExtensions } from 'quasar-tiptap'
import 'quasar-tiptap/lib/index.css'
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
