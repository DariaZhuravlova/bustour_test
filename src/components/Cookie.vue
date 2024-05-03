<template>
  <div>
    <select v-model="selectedOption">
      <option value="option1">Option 1</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
    <label>
      <input type="checkbox" v-model="saveToCookie"> Save to cookie
    </label>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const selectedOption = ref(null);
const saveToCookie = ref(false);

// Функция для установки cookie
const setCookie = (name, value, minutes) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + (minutes * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expiryDate.toUTCString()};path=/`;
};

// Функция для получения cookie по имени
const getCookie = (name) => {
  const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
  return cookieValue ? cookieValue.pop() : null;
};

// Функция для удаления cookie по имени
const deleteCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

// При монтировании компонента проверяем, сохранено ли значение в cookie
watchEffect(() => {
  const savedOption = getCookie('selectedOption');
  if (savedOption) {
    selectedOption.value = savedOption;
  }
});

// При изменении выбранной опции сохраняем в cookie, если чекбокс отмечен
watchEffect(() => {
  if (saveToCookie.value) {
    setCookie('selectedOption', selectedOption.value, 15); // 15 минут
  } else {
    deleteCookie('selectedOption');
  }
});
</script>

<style scoped>
div {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

label {
  font-weight: bold;
}

select {
  margin-right: 10px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>