<template>
  <header>
    <div class="date">
      <div class="date-left">
        <h1>{{$dayjs(date).$D}}</h1>
        <div class="date-small">
          <h2>{{$dayjs(date).format('MM')}}</h2>
          <h3>{{$dayjs(date).$y}}</h3>
        </div>
      </div>
    </div>
    <div class="date-right">
      <h2>{{$dayjs(date).format('dddd')}}</h2>
    </div>
  </header>
</template>

<style lang="scss">
  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .date-left {
    display: flex;
    flex-direction: row;
    text-transform: uppercase;

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
  data() {
    return {
      date : new Date(),
    }
  },
}
</script>