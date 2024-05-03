import {defineStore} from "pinia";

export const useItemsStore = defineStore({
    id: "items",

    state: () => ({
        items: [
            {
                id: 1,
                title: "Sample Text",
                description: "Sample Description",
                assignedUser: {
                    id: 1,
                    name: "Sample User",
                    email: "sample@sample.com",
                },
            },
            {
                id: 2,
                title: "Sample Text 2",
                description: "Sample Description 2",
                assignedUser: {
                    id: 2,
                    name: "Sample User 2",
                    email: "sample2@sample.com",
                },
            },
        ],
    }),

    actions: {
        addItem(newItem) {
            this.items.push(newItem);
        },

        updateItem(updatedItem) {
            const index = this.items.findIndex((item) => item.id === updatedItem.id);
            if (index !== -1) {
                this.items[index] = updatedItem;
            }
        },

        deleteItem(id) {
            this.items = this.items.filter((item) => item.id !== id);
            console.log(this.items);
        },

        updateAssignedUser({itemId, updatedUser}) {
            const item = this.items.find((item) => item.id === itemId);
            if (item) {
                item.assignedUser = updatedUser;
            }
        },
    },

    getters: {
        getAllItems() {
            return this.items;
        },

        getItemById(id) {
            return this.items.find((item) => item.id === id);
        },
    },
});
