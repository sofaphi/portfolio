<template>
  <div @click="getPlaces" class="places">
    <h2>Места</h2>
    <div class="container">
      <div>
        <v-checkbox v-model="sort" label="отсортировать по году открытия" />
      </div>
      <v-card
        elevation="2"
        v-for="(place, id) in getSortedPlaces()"
        v-bind:key="id"
        class="card"
      >
        <h3>{{ place.study_place_name }}</h3>
        <p>
          Адрес: {{ place.address }}
          <br />
          Работают с
          <time> {{ new Date(place.since).getFullYear() }}</time>
          года
        </p>
      </v-card>
    </div>
    <v-pagination
      v-model="page"
      :length="Math.ceil(getPlaces()?.count / 3)"
    ></v-pagination>
    <Form v-on:create="refetch()" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '../components/Form.vue'
export default {
  name: 'PlacesPage',
  components: {
    Form,
  },
  data() {
    return {
      page: 1,
      sort: false,
    }
  },
  methods: {
    ...mapGetters({
      getPlaces: 'place/getPlaces',
    }),
    getSortedPlaces() {
      return (
        this.getPlaces()?.results &&
        [...this.getPlaces()?.results]?.sort((a, b) => {
          if (this.sort) {
            console.log(
              new Date(a.since).getFullYear() - new Date(b.since).getFullYear()
            )
            return (
              new Date(a.since).getFullYear() - new Date(b.since).getFullYear()
            )
          } else {
            console.log(-1)
            return 1
          }
        })
      )
    },
    refetch() {
      window.location.reload()
    },
  },
  watch: {
    page: {
      handler() {
        this.$store.dispatch(
          'place/fetchPlaces',
          `/place/?limit=3&offset=${(this.page - 1) * 3}`
        )
      },
    },
  },
  mounted() {
    this.$store.dispatch(
      'place/fetchPlaces',
      `/place/?limit=3&offset=${(this.page - 1) * 3}`
    )
  },
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
.card {
  min-height: 100px;
  padding: 10px 20px;
}

.places > h2 {
  padding: 12px;
}
</style>
