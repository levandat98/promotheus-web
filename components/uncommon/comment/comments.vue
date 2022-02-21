<template>
  <div class="pb-28">
    <div class="flex pt-4">
      <div class="avatar">
        <img
          class="w-16 h-16 rounded-lg"
          src="https://i.scdn.co/image/ab67656300005f1f9e0b4846a03bfc78b0bf01c9"
          alt=""
        />
      </div>
      <div class="w-full">
        <div class="pl-6 align-middle my-auto max-w-5xl">
          <div class="font-medium">Adiez Chotto</div>
          <el-input
            v-model="content"
            type="textarea"
            :autosize="{ minRows: 1, maxRows: 4 }"
            placeholder="Please input"
            class="bg-gray-600 pt-1"
          >
          </el-input>
          <div v-if="content.length > 0" class="flex flex-row-reverse pt-2">
            <el-button type="primary ml-3 bg-sky-900 border-0">
              Comment
            </el-button>
            <el-button type="text text-gray-300" @click="cancelComment"
              >Cancel</el-button
            >
          </div>
        </div>
      </div>
    </div>
    <div class="pt-6">
      <CommentItem v-for="cmt in comments" :key="cmt.id" :comment="cmt" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CommentItem from './commentItem.vue'
export default {
  name: 'Comment',

  components: { CommentItem },
  props: {
    comments: {
      type: Object,
      default() {
        return [
          {
            id: 12101,
            content:
              'Sit delectus doloremque quae recusandae accusamus.\nHarum consectetur explicabo et ea nihil repudiandae expedita rerum.\nReprehenderit saepe beatae dolor sed non quia suscipit amet eveniet.\nVitae dolorem consequatur et voluptatem occaecati nemo rem.\nDolor sint praesentium cupiditate doloremque dolores.',
            dislike: 100,
            like: 100,
            user: {
              id: 43,
              fullName: 'Estell Heathcote',
              avatar:
                'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200',
            },
          },
        ]
      },
    },
  },
  data() {
    return {
      content: '',
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),

  methods: {
    cancelComment() {
      this.content = ''
    },
  },
}
</script>
<style lang="scss">
.el-textarea__inner {
  background-color: var(--color-gray-800);
  border: 0px;
  color: #f8f9fa;
  border-bottom: 1px solid white;
  transition: all 0.3s;
  position: relative;
}
.el-textarea {
  background-color: var(--color-gray-800) !important;
}
</style>
