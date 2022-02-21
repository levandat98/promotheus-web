<template>
  <div class="DetailPage pt-6">
    <div class="header flex">
      <div class="logo">
        <img class="logoImg" :src="creator.avatar" alt="" />
      </div>
      <div class="Title relative">
        <div class="absolute bottom-0">
          <span>PODCAST CREATOR</span>
          <div class="font-semibold text-7xl">
            {{ creator.fullName }}
          </div>
        </div>
      </div>
    </div>
    <div class="body pt-6 flex">
      <div class="content">
        <div class="Series">
          <div class="flex justify-between">
            <div class="text-3xl font-semibold hover:underline cursor-pointer">
              Series
            </div>
          </div>
          <div>
            <SerieItem v-for="serie in series" :key="serie.id" :serie="serie" />
          </div>
        </div>
        <div class="Episodes">
          <div class="flex justify-between">
            <div class="text-3xl font-semibold hover:underline cursor-pointer">
              Episodes
            </div>
          </div>
          <div class="listEpisode pt-4">
            <EpisodeItem
              v-for="episode in episodes"
              :key="episode"
              :episode="episode"
            />
          </div>
        </div>
      </div>
      <div class="bio pl-4">
        <div class="text-3xl font-semibold">Bio</div>
        <div v-if="!showMore" class="pt-4">
          <div>
            {{ bio }}
          </div>
          <div
            v-if="bioLength > 100"
            class="hover:underline cursor-pointer font-semibold"
            @click="showMore = !showMore"
          >
            ... show more
          </div>
        </div>
        <div v-if="showMore" class="pt-4">
          <div>
            {{ bio }}
          </div>
          <div
            class="hover:underline cursor-pointer font-semibold"
            @click="showMore = !showMore"
          >
            ... show less
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { config } from './config'
import { mapState } from 'vuex'
import { EpisodeItem } from '~/components/uncommon/Episode'
import { SerieItem } from '~/components/uncommon/Series'
export default {
  name: 'Home',
  meta: {
    config,
  },
  components: { EpisodeItem, SerieItem },
  layout: 'default',
  middleware: ['auth'],
  async fetch() {
    try {
      const id = this.$route.params.id
      const { data } = await this.$authApi.get(`/creators/${id}`)
      this.creator = data
      this.series = data.series.filter((x) => x.episodes.length)
      this.episodes = data.episodes
      this.bio =
        this.creator.bio.length > 300
          ? this.creator.bio.substring(0, 300)
          : this.creator.bio
      this.bioLength = this.creator.bio.length
    } catch (error) {
      return
    }
  },
  data() {
    return {
      episodes: {
        type: Array,
        default: [],
      },
      series: {
        type: Array,
        default: [],
      },
      creator: {
        type: Object,
        default: {},
      },
      showMore: false,
      bio: '',
      bioLength: 0,
    }
  },
  computed: mapState({
    locale: (state) => state.locale,
  }),
  watch: {
    showMore: {
      handler() {
        this.bio = !this.showMore
          ? this.creator.bio.substring(0, 300)
          : this.creator.bio
      },
    },
  },
  created() {
    this.$store.commit('SET_PAGE_TITLE', 'Dashboard')
  },

  head() {
    return {
      title: this.$t('home.title'),
    }
  },
}
</script>
<style lang="scss" scoped>
.DetailPage {
  width: 100vw;
  background-color: linear-gradient(
    rgba(209, 213, 219, var(--tw-text-opacity)),
    rgb(75, 85, 99) 75%
  );
  padding-top: 16px;
  .header {
    background: linear-gradient(transparent 0, rgba(0, 0, 0, 0.5) 100%),
      var(--background-noise);
    padding: 0px 24px 32px 24px;
    height: 260px;
    .Title {
      width: 100%;
      min-width: 900px;
      padding-left: 24px;
    }
  }
  .body {
    padding-left: 24px;
    padding-right: 24px;
    .content {
      min-width: 720px;
      width: 100%;
    }
  }

  .logo {
    height: 232px;
    min-width: 232px;
    width: 232px;
    padding-right: 10px;
    .logoImg {
      border-radius: 10px;
    }
  }
  .icon {
    color: rgb(226, 232, 240);
    :hover {
      color: rgb(255, 255, 255);
      cursor: pointer;
    }
  }
}
</style>
