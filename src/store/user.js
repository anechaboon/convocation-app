import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    availableSeat: 0,
    registered: 0,
    firstName: "",
    lastName: "",
    telephone: "",
  }),
  actions: {
    increment() {
      this.availableSeat++;
    },
    decrement() {
      this.availableSeat--;
    },
    register(data){
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.telephone = data.telephone
      this.availableSeat--;
    }
  }
});
