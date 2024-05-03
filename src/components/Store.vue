<template>
  <div>
    <h1>Список элементов</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <p>Имя пользователя: {{ item.assignedUser.name }}</p>
        <p>Email пользователя: {{ item.assignedUser.email }}</p>
        <button @click="deleteItem(item.id)">Удалить</button>
        <button @click="selectItemForEdit(item)">Редактировать</button>
      </li>
    </ul>

    <div v-if="selectedItem">
      <h2>Редактирование элемента:</h2>
      <input type="text" v-model="selectedItem.title" placeholder="Название">
      <input type="text" v-model="selectedItem.description" placeholder="Описание">
      <input type="text" v-model="selectedItem.assignedUser.name" placeholder="Имя пользователя">
      <input type="email" v-model="selectedItem.assignedUser.email" placeholder="Email пользователя">
      <button @click="saveEditedItem">Сохранить</button>
    </div>
  </div>
</template>

<script setup>
import { useItemsStore } from '../stores/ItemsStore';
import { ref, watch } from 'vue';

const store = useItemsStore();

const items = ref(store.items);
const selectedItem = ref(null);

const deleteItem = (itemId) => {
  store.deleteItem(itemId);
  console.log(`Элемент с ID ${itemId} был удален.`);
};

const selectItemForEdit = (item) => {
  selectedItem.value = JSON.parse(JSON.stringify(item));
};

const saveEditedItem = () => {
  if (selectedItem.value) {
    store.updateItem(selectedItem.value);
    console.log(`Элемент с ID ${selectedItem.value.id} был отредактирован.`);
    selectedItem.value = null;
  }
};

watch(() => store.items, (newItems) => {
  items.value = newItems;
});
</script>
