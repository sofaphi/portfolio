<template>
  <div>
    <h2 class="heading">Студенты</h2>
    <div class="filter">
      <v-checkbox
        v-model="filter"
        label="Показать только студентов с проектами"
      />
    </div>
    <main class="container">
      <v-card
        class="card"
        v-for="student in getStudents().results.filter((el) => {
          if (!filter) return true
          return el.project.length
        })"
        v-bind:key="student.id"
      >
        <h3 class="name">{{ student.name }}</h3>
        <p>
          Студент {{ student.group }} курса
          <br />
          Унивеситет:
          {{
            getPlaces().results?.find((el) => el.id === student.place[0])
              ?.study_place_name
          }}
          <br />
          О студенте: {{ student.about }}
          <br />
          Количество проектов: {{ student.project.length }}
        </p>
      </v-card>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'StudentsPage',
  data() {
    return {
      filter: true,
    }
  },
  methods: {
    ...mapGetters({
      getStudents: 'students/getStudents',
      getPlaces: 'place/getPlaces',
    }),
  },
  mounted() {
    this.$store.dispatch('students/fetchStudents')
    this.$store.dispatch('place/fetchPlaces', `/place/?limit=999`)
    console.log(this.getPlaces())
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.card {
  padding: 20px;
  min-height: 100px;
}

.heading {
  padding: 20px;
}
.name {
  font-size: 1.25rem;
}

.filter {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
