<template>
  <div>
    <div class="title">
      <div class="line"></div>
      <h1>todo <span class="light">list</span></h1>
      <div class="line"></div>
    </div>

    <div v-for="category in categories" :key="category.id" class="list" :style="{backgroundColor:category.color}"><nuxt-link :to="{path: `/category/${category.id}`}">
      <h4 class="list-title">{{category.title}}</h4>
      <p class="list-description">{{category.description}}</p></nuxt-link>
    </div>

    <div class="add-list list">
      <input type="text" name="newlist-title" id="newlist-title" placeholder="Nouvelle catégorie" v-model="nameInput">
      <textarea placeholder="Description..." name="newlist-description" id="newlist-description" cols="30"
        rows="3" v-model="descriptionInput"></textarea>
      <p>Couleur:</p>
      <ColorPicker v-model="colorInput" />
    </div>


    <div class="add-icon" @click.prevent="createCategory">
      <svg aria-hidden="true" width="30px" height="30px" focusable="false" data-prefix="fas" data-icon="plus"
        class="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
        <path fill="#fff"
          d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z">
        </path>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">

  .list {
    background-color: #1e3799;
    color: white;
    padding: 20px;
    border-radius: 10px;
    margin-top: 40px;
    box-shadow: 0px ​5px 6px 3px rgba(0, 0, 0, 0.2);

    .list-title {
      margin: 0;
      margin-bottom: 10px;
      font-size: 20px;
    }

    .list-description {
      margin: 0;
      padding-top: 10px;
      border-top: 1px solid white;
      font-size: 16px;
    }
  }

  .add-icon {
    width: 40px;
    height: 40px;
    border-radius: 30px;
    padding: 5px;
    background-color: #585858;
    position: absolute;
    bottom: 5%;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background .3s ease;

    &:active {
      background-color: #4d4c4c;
    }
  }

  #newlist-title {
    background: none;
    border: none;
    color: #585858;
    font-size: 18px;
    font-family: 'Dosis', 'sans-serif';
    font-size: 24px;
    font-weight: 600;
  }

  #newlist-description {
    background: none;
    border: none;
    outline: none;
    font-family: 'Dosis', 'sans-serif';
    font-size: 18px;
  }

  .add-list {
    background-color: #f3f3f3;
    color: #585858;

    h4 {
      color: #585858;
    }
  }

</style>

<script>
  export default {
    layout: 'main',

    async asyncData({
      $axios
    }) {
      const categories = await $axios.$get('/api/category')
      return {
        categories
      }
    },
    data() {
      return {
        nameInput : "",
        descriptionInput : "",
        colorInput : "",
      }
    },
    methods: {
      async createCategory() {
        console.log(this.nameInput, this.descriptionInput, this.colorInput)
        const newCategory = await this.$axios.$post('/api/category/', {
          title: this.nameInput,
          description: this.descriptionInput,
          color: this.colorInput
        })
      }
    }
  }
</script>
