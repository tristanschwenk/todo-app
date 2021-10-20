<template>
  <header>
    <div class="date" v-if="!smallHeader">
      
      <div  class="date-left">
        <h1>{{$dayjs(date).$D}}</h1>
        <div class="date-small">
          <h2>{{$dayjs(date).format('MM')}}</h2>
          <h3>{{$dayjs(date).$y}}</h3>
        </div>
      </div>

      <div class="date-right">
      <h2>{{$dayjs(date).format('dddd')}}</h2>
    </div>
    </div>
    

     <div v-else class="date-left" @click.prevent="goBack">
        <icon-chevron />
      </div>
  </header>
</template>

<style lang="scss">
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 10vh;

    h1 {
      margin: 0;
    }
  }

  .date {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .date-left {
    display: flex;
    flex-direction: row;
    text-transform: uppercase;
    margin: 2rem 0;

    .date-small {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }

  .date-small * {
    margin: 0;
    margin-left: 10px;
  }

  .date-right h2 {
    text-transform: uppercase;
  }

</style>


<script>
export default {
  props: {
    smallHeader: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      date : new Date(),
    }
  },
  methods: {
    goBack() {
      this.$router.push("/")
    }
  }
}
</script>