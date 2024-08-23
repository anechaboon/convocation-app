import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    availableSeat: 0,
    registered: 0,
    id: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  }),
  actions: {
    setAvailableSeat(availableSeat){
      this.availableSeat = availableSeat
    },
    setRegistered(registered){
      this.registered = registered
    },
    increment() {
      this.availableSeat++;
    },
    decrement() {
      this.availableSeat--;
    },
    setUserData(data){
      this.id = data._id
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.phoneNumber = data.phoneNumber
    }
  },
  persist: true

});
