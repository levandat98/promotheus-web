<template>
  <div>
    <div>
      <div class="flex pt-4">
        <div class="avatar">
          <img class="w-12 h-12 rounded-lg" :src="comment.user.avatar" alt="" />
        </div>
        <div class="w-full">
          <div class="pl-6 align-middle my-auto w-full">
            <div class="font-medium">{{ comment.user.fullName }}</div>

            <div class="text-sm text-gray-300 max-w-5xl">
              {{ comment.content }}
            </div>
            <div class="">
              <fa
                :icon="['fas', 'thumbs-up']"
                class="
                  text-sm text-gray-300
                  font-medium
                  cursor-pointer
                  mt-1
                  icon
                  text-slate-200
                "
              />
              <span
                class="text-sm text-gray-300 font-medium mt-0.5 pl-2 pr-2"
                >{{ comment.like }}</span
              >
              <fa
                :icon="['fas', 'thumbs-down']"
                class="
                  text-sm text-gray-300
                  font-medium
                  cursor-pointer
                  icon
                  -mb-1
                  text-slate-200
                "
              />
              <span class="text-sm text-gray-300 font-medium pl-2">{{
                comment.dislike
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default() {
        return {
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
        }
      },
    },
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),

  methods: {},
}
</script>
<style lang="scss"></style>
