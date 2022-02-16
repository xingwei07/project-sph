<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor
      v-for="floorData in floorList"
      :key="floorData.id"
      :floorData="floorData"
    ></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ListContainer from '@/pages/Home/ListContainer'
import TodayRecommend from '@/pages/Home/TodayRecommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

export default {
  name: 'Home',
  components: {
    ListContainer,
    TodayRecommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted () {
    this.$store.dispatch('homeStore/getFloorList')
  },
  computed: {
    ...mapState('homeStore', ['floorList'])
  }
}
</script>

<style>
</style>