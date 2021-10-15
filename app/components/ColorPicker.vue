<template>
  <div class="color-picker">
    <div v-for="color in colors" :key="color.name">
      <input type="radio" name="color" :id="color.name" :value="color.code"
        @input="$emit('input', $event.target.value)" />
      <label :for="color.name"><span :style="{backgroundColor: color.code}"></span></label>
    </div>
  </div>
</template>

<style lang="scss">
  /* Color picker */

  .color-picker {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-items: center;
  }

  input[type="radio"] {
    display: none;

    &:checked+label {
      span {
        transform: scale(1.25);
      }
    }
  }

  label {
    display: inline-block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    cursor: pointer;

    &:hover {
      span {
        transform: scale(1.25);
      }
    }

    span {
      display: block;
      width: 100%;
      height: 100%;
      transition: transform .2s ease-in-out;
      border-radius: 5px;
    }
  }

</style>

<script>
  export default {
    data() {
      return {
        colors: [{
            name: "blue",
            code: "#4ecdc4"
          },
          {
            name: "green",
            code: "#1a535c"
          },
          {
            name: "yellow",
            code: "#ffe66d"
          },
          {
            name: "red",
            code: "#ff6b6b"
          },
        ]
      }
    }
  }

</script>
