<template>
  <div>
    <div class="title">
      <div class="line-color" :style="{backgroundColor: category.color}"></div>
      <h1><span class="light">{{category.title}}</span></h1>
      <div class="line-color" :style="{backgroundColor: category.color}"></div>
    </div>

    <div class="todo-list">
      <div class="todo" :class="{checked: note.checked}" v-for="(note, index) in notesunChecked" :key="note.id" @click.prevent="clickNote(index)">
        <p>{{note.text}}</p>
        <div class="icon"></div>
      </div>
    </div>

    <div class="todo input-card">
      <input v-model="text" type="text" placeholder="Entrez votre rappel..." @keyup.enter="addNote">
    </div>

    <div class="todo-list">
      <div class="todo" :class="{checked: note.checked}" v-for="(note, index) in notesChecked" :key="note.id" @click.prevent="clickNote(index)">
        <p>{{note.text}}</p>
        <div class="icon"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .input-card input {
    width: 100%;
    border: none;
    border-radius: 10px;
    background-color: #f3f3f3;
    font-family: 'Dosis', 'sans-serif';
    font-size: 18px;
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

  .todo-list {
    margin-top: 50px;

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

</style>

<script>
  export default {
    layout: 'main',

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
      notesChecked: function() {
        return this.category.notes.filter((el)=> {
          return el.checked
        })
      },
      notesunChecked: function() {
        return this.category.notes.filter((el)=> {
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

        this.category.notes.push(newNote.data)
        console.log(this.category.notes)
        this.text = ""
      },
      async clickNote(index) {
        this.category.notes[index].checked = !this.category.notes[index].checked
        const update = await this.$axios.patch(`/api/notes/${this.category.notes[index].id}`, {
          checked: this.category.notes[index].checked
        })

        console.log(update)
      }
    }
  }

</script>
