<template>
  <div>
    <h1>Список пользователей</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        <strong>{{ user.name }}</strong> - {{ user.company.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const users = ref([]);

const fetchUsers = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    users.value = response.data;
  } catch (error) {
    console.error('Ошибка при загрузке пользователей:', error.message);
  }
};

onMounted(fetchUsers);
</script>
