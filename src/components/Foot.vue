<template>
  <div style="border-top: 1px #e1e4e8 solid !important;padding: 45px 0px 45px 0px;">
		<el-row>
			<el-col :span="10">
				<div>
					© 2018 {{ userInfo.login }}&emsp;&emsp;
					<a :href="userInfo.html_url" target="_blank">Profile</a>&emsp;&emsp;
				</div>
			</el-col>
			<!-- <el-col :span="4">
				<div style="text-align: center;font-size: 18px">
					<i class="el-icon-location-outline"></i>
				</div>
			</el-col> -->
			<el-col :span="14">
				<div style="float: right;">
					<a href="https://developer.github.com" target="_blank">GitHub-API</a>&emsp;&emsp;
					<a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>&emsp;&emsp;
					<a href="http://element.eleme.io/" target="_blank">Element</a>&emsp;&emsp;
          <a href="https://gridsome.org/" target="_blank">Gridsome</a>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<static-query>
query {
  userInfo: allUserInfo {
    edges {
      node {
        login
        html_url
      }
    }
  }
}
</static-query>

<script>
export default {
  name: 'Foot',
  computed: {
    // 用户信息
    userInfo () {
      return this.$static.userInfo.edges[0].node
    }
  }
}
</script>

<style>

</style>
