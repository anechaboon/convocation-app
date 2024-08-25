import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    seatAvailable: 0,
    registerAvailable: 0,
    registered: 0,
    userID: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    usersList: [],
    bookingID: "",
  }),
  actions: {
    setSeatAvailable(seatAvailable){
      this.seatAvailable = seatAvailable
    },
    setRegisterAvailable(registerAvailable){
      this.registerAvailable = registerAvailable
    },
    setRegistered(registered){
      this.registered = registered
    },
    increment() {
      this.seatAvailable++;
    },
    decrement() {
      this.seatAvailable--;
    },
    setUserData(data){
      this.userID = data._id
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.phoneNumber = data.phoneNumber
      console.log(`🚀 log:this.userID`,this.userID )
    },
    setUsersListData(usersList){
      this.usersList = usersList
    },
    setbookingID(bookingID){
      this.bookingID = bookingID
    },
    setAvailable(data){
      this.seatAvailable = data.seatAvailable 
      this.registerAvailable = data.registerAvailable 
      this.registered = data.registered 
    }
  },
  persist: true

});
