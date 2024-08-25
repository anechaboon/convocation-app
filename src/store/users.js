import { defineStore } from 'pinia';
import Api from "@/services/endpoint.js";

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
    reservedsList: [],
    convocation: {
      seatAvailable : "",
      registerAvailable : "",
      registered : "",
    },
    openModalRegister: false
  }),
  actions: {
    setOpenModalRegister(openModalRegister) {
      this.openModalRegister = openModalRegister
    },
    async loadUsersList(searchUser = ""){
      const queryString = `?q=${searchUser}`;
      try {
        const res = await Api.User.getUser(queryString);
        if (res) {
          this.usersList = res.data
        }
      } catch (error) {
          console.error('Error fetching users:', error);
      }
    },
    async loadConvocation(){
      try {
          const res = await Api.Convocation.getConvocation();
        if(res){
            this.setConvocation(res.data)
        }
      } catch (error) {
          console.error('Error fetching convocation:', error);
      }
    },
    async loadReserved(){
      try {
          const res = await Api.Reservation.getReserved();
          if(res){
            this.setReservedsList(res.data)
          }
      } catch (error) {
          console.error('Error fetching reserved:', error);
      }
    },
    setReservedsList(reservedsList){
      this.reservedsList = reservedsList
    },
    setSeatAvailable(seatAvailable){
      this.seatAvailable = seatAvailable
    },
    setRegisterAvailable(registerAvailable){
      this.registerAvailable = registerAvailable
    },
    setRegistered(registered){
      this.registered = registered
    },
    setUserData(data){
      this.userID = data._id
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.phoneNumber = data.phoneNumber
    },
    setUsersListData(usersList){
      this.usersList = usersList
    },
    setbookingID(bookingID){
      this.bookingID = bookingID
    },
    setConvocation(data){
      this.convocation = data 
    }
  },
  persist: true

});
