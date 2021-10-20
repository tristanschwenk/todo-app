<template>
  <div>
    <Header :smallHeader='true' />
    <div class="content">
      <div class="title">
        <div class="line-color" :style="{backgroundColor: category.color}"></div>
        <h1><span class="light">{{category.title}}</span></h1>
        <div class="line-color" :style="{backgroundColor: category.color}"></div>
      </div>

      <div class="todo input-card">
        <input v-model="text" type="text" placeholder="Entrez votre rappel..." @keyup.enter="addNote">
      </div>

      <div class="card">
        <transition-group name="fade">
          <div class="todo" :class="{checked: note.checked}" v-for="(note, index) in notesunChecked" :key="note.id"
            @click.prevent="clickNote(index, true)">
            <p>{{note.text}}</p>
            <div class="icon"></div>
          </div>
        </transition-group>
      </div>

      <div class="card">
        <transition-group name="fade">
          <div class="todo" :class="{checked: note.checked}" v-for="(note, index) in notesChecked" :key="note.id"
            @click.prevent="clickNote(index, false)">
            <p>{{note.text}}</p>
            <div class="icon"></div>
          </div>
        </transition-group>
      </div>

      <div class="card">
        <button class="delete-button" @click.prevent="delCategory">
          <icon-bin width="15" height="15" style="margin-right: .2em;" />Delete Category</button>
      </div>
    </div>


  </div>
</template>

<style lang="scss">
  .input-card {
    margin-top: 50px !important;

    input {
      width: 100%;
      border: none;
      border-radius: 10px;
      background-color: #f3f3f3;
      font-family: 'Dosis', 'sans-serif';
      font-size: 18px;

    }

  }

  .todo {
    display: flex;
    width: 80%;
    padding: 15px;
    border-radius: 10px;
    background-color: #f3f3f3;
    margin: auto;
    margin-bottom: 20px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: opacity 1s;

    p {
      margin: 0;
      font-size: 18px;
    }

    p,
    .icon {
      pointer-events: none;
    }

    .icon {
      width: 12px;
      height: 12px;
      border: 3px solid #585858;
      border-radius: 20px;
    }
  }

  .card {
    .checked {
      opacity: 50%;
      text-decoration-line: line-through;
      transition: all .5s;

      .icon {
        background-color: #1e3799;
        border-color: #1e3799;
      }
    }
  }

  .delete-button {
    margin: auto;
    background-color: #ff6b6b;
    color: white;
    font-size: 1em;
    padding: .7em;
    border-radius: 1em;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    transition: all .2s;
    box-sizing: border-box;

    &:active {
      background: #e25e5e;
    }
  }

</style>

<script>
  import Header from '../../components/Header.vue'
  export default {
    components: {
      Header
    },
    layout: 'main',
    transition: 'slide-left',

    async asyncData({
      $axios,
      params
    }) {
      console.log(params.id)
      const category = await $axios.$get(`/api/category/${params.id}`)
      return {
        category
      }
    },
    data() {
      return {
        text: ""
      }
    },
    mounted() {
      window.vueInstance = this
    },
    computed: {
      notesChecked: function () {
        return this.category.notes.filter((el) => {
          return el.checked
        })
      },
      notesunChecked: function () {
        return this.category.notes.filter((el) => {
          return !el.checked
        })
      }
    },
    methods: {
      async addNote() {
        const data = {
          text: this.text,
          categoryId: this.category.id
        }

        const newNote = await this.$axios.post("/api/notes/", data)

        this.notesunChecked.push(newNote.data)
        console.log(this.category.notes)
        this.text = ""
      },
      async clickNote(index, check) {
        let update
        if (check) {
          console.log(!this.notesunChecked[index].checked);
          update = await this.$axios.patch(`/api/notes/${this.notesunChecked[index].id}`, {
            checked: !this.notesunChecked[index].checked
          })
          this.notesunChecked[index].checked = !this.notesunChecked[index].checked

        } else {
          console.log(!this.notesChecked[index].checked);
          update = await this.$axios.patch(`/api/notes/${this.notesChecked[index].id}`, {
            checked: !this.notesChecked[index].checked
          })
          this.notesChecked[index].checked = !this.notesChecked[index].checked

        }
        console.log(update);
      },

      async delCategory() {
        const deletedCategory = await this.$axios.delete(`/api/category/${this.category.id}`)

        this.$router.push("/")
      }
    }
  }

</script>
