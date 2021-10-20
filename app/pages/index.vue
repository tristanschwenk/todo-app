<template>
  <div>
    <Header />

    <div class="content">
      <div class="title">
        <div class="line"></div>
        <h1>todo <span class="light">list</span></h1>
        <div class="line"></div>
      </div>

      <div v-for="category in sortedArray" class="list-item" :key="category.id">
        <div class="list" :style="{backgroundColor:category.color}">
          <nuxt-link :to="{path: `/category/${category.id}`}">
            <h4 class="list-title">{{category.title}}</h4>
            <p class="list-description">{{category.description}}</p>
          </nuxt-link>
        </div>
      </div>

      <div class="list add-list">
        <input type="text" name="newlist-title" id="newlist-title" placeholder="Nouvelle catégorie" v-model="nameInput">
        <textarea placeholder="Description..." name="newlist-description" id="newlist-description" cols="30" rows="3"
          v-model="descriptionInput"></textarea>
        <p>Couleur:</p>
        <ColorPicker v-model="colorInput" />
        <div class="submitter">
          <button class="add-button" @click.prevent="createCategory">Ajouter</button>
        </div>
      </div>

      <div class="add-icon" @click.prevent="createCategory">
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  .list {
    background-color: #1e3799;
    color: white;
    padding: 20px;
    border-radius: 10px;
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

  .list-item {
    display: grid;
    grid-template-columns: 1fr auto;
    align-content: center;
    margin-top: 40px;


    .delete-button {
      background-color: #ff6b6b;
      border-radius: 10px;
      color: white;
      display: none;

      &:active {
        background-color: #633737;
      }
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
    margin-top: 40px;

    h4 {
      color: #585858;
    }

    .submitter {
      width: 100%;
      display: grid;
      justify-items: center;

      .add-button {
        border-radius: 10px;
        color: white;
        padding: .5em .8em;
        text-align: center;
        font-size: 1em;
        margin-top: 1em;
        background-color: #585858;
        transition: background .3s ease;

        &:active {
          background-color: #4d4c4c;
        }
      }
    }
  }

</style>

<script>
  export default {
    transition: 'slide-right',

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
        nameInput: "",
        descriptionInput: "",
        colorInput: "",
      }
    },
    computed: {
      sortedArray: function () {
        return this.categories.sort((a, b) => a.updatedAt > b.updatedAt)
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

        this.categories.push(newCategory)
        this.nameInput = ""
        this.descriptionInput= ""
        this.colorInput= ""
      },

      onSwipe(e) {
        console.log('swipe successfully', e)
      },
      del(category) {
        console.log('clicked')
      }
    },
  }

</script>
