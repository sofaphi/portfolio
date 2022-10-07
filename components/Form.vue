<template>
  <div>
    <h2>Добавить местро</h2>
    <v-form v-model="valid" ref="form">
      <v-text-field v-model="name" label="Название места учебы" required />
      <v-text-field v-model="address" label="Адрес" required />
      <v-text-field
        v-model="year"
        label="Год основания"
        :rules="[rules.year]"
      />
      <v-text-field
        label="Работают до"
        :rules="[rules.time]"
        placeholder="20:00"
        v-model="time"
      />
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
        Создать
      </v-btn>
    </v-form>
  </div>
</template>
<script>
export default {
  name: 'Form',
  data() {
    return {
      time: '',
      year: '',
      address: '',
      name: '',
      valid: false,
      rules: {
        require: (value) => {
          if (!value.length) return 'Ошибка'
        },
        length: (value) => value.length <= 20 || 'Max 20 characters',
        time: (value) => {
          const pattern = /\b(?:[01][0-9]|2[0-3]):[0-5][0-9]\b/g
          return pattern.test(value) || 'Неправильный формат времени'
        },
        year: (value) => {
          const pattern = /^[1-2]{1}[1-9]{3}$/g
          return pattern.test(value) || 'Неправильный формат года'
        },
      },
    }
  },
  methods: {
    validate() {
      const request = {
        study_place_name: this.name,
        since: new Date('1.1.' + this.year).toISOString(),
        work_till: this.time + ':00',
        address: this.address,
      }
      console.log()
      this.$store.dispatch('place/createPlace', request)
      this.$emit('create')
    },
  },
}
</script>
