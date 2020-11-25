<template>
  <Layout>

    <div style="min-height: 600px" v-loading="loading">
      <el-card shadow="never" style="min-height: 400px" v-if="blog.id">
        <div slot="header">
          <span>{{ blog.title }}</span>
        </div>
        <div style="font-size: 0.9rem;line-height: 1.5;color: #606c71;">
          发布 {{ blog.created_at | date }}
          <br> 更新 {{ blog.updated_at | date }}
        </div>
        <div style="font-size: 1.1rem;line-height: 1.5;color: #303133;border-bottom: 1px solid #E4E7ED;padding: 5px 0px 5px 0px">
          <pre style="font-family: '微软雅黑'">{{ blog.description }}</pre>
        </div>
        <template v-if="content">
          <div
            v-html="markdown(md.content)"
            class="markdown-body"
            style="padding-top: 20px"
            v-for="md in content"
            :key="md.raw_url"
          ></div>
        </template>
      </el-card>
      <el-card shadow="never" style="margin-bottom: 20px;padding: 20px 0px 20px 0px;text-align: center" v-if="!blog.id">
        <font style="font-size: 30px;color:#dddddd ">
          <b>没有更新 ╮(๑•́ ₃•̀๑)╭</b>
        </font>
      </el-card>
    </div>

  </Layout>
</template>

<page-query>
query {
  list: allGist {
    edges {
      node {
        id
        created_at
        updated_at
        description
      }
    }
  }
}
</page-query>

<script>
import axios from 'axios'
import MarkdownIt from 'markdown-it'
const markdown = new MarkdownIt()

export default {
  name: 'HomePage',
  data () {
    return {
      loading: false,
      content: [],
      title: ''
    }
  },
  metaInfo: {
    title: '最新动态'
  },
  computed: {
    blog () {
      let blog = {
        id: '',
        content: '',
        title: '标题',
        description: '',
        createTime: '',
        updateTime: '',
        content: '## title'
      }
      let blogData = this.$page.list.edges[0].node || {}
      blog = Object.assign(blog, blogData)
      return blog
    }
  },
  methods: {
    async getDetail (id) {
      const { data } = await axios.get(`https://api.github.com/gists/${id}`)
      const files = data.files
      for (const key in files) {
        this.content.push(files[key])
      }
    },

    markdown (md) {
      return markdown.render(md)
    }
  },
  created () {
    this.getDetail(this.blog.id)
  }
}
</script>

<style></style>
