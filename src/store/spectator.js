import { defineStore } from 'pinia';
import Api from "@/services/endpoint.js";

export const useSpectatorStore = defineStore('spectator', {
  state: () => ({
    seatAvailable: 0,
    registerAvailable: 0,
    registered: 0,
    spectatorID: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    spectatorList: [],
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
    async loadSpectatorList(searchSpectator = "", nophone = false){
      let queryString = `?q=${searchSpectator}`;
      if(nophone){
        queryString += "&nophone=yes"
      }
      try {
        const res = await Api.Spectator.getSpectator(queryString);
        if (res) {
          this.spectatorList = res.data
        }
      } catch (error) {
          console.error('Error fetching spectator:', error);
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
    setSpectatorData(data){
      this.spectatorID = data._id
      this.firstName = data.firstName
      this.lastName = data.lastName
      this.phoneNumber = data.phoneNumber
    },
    setSpectatorListData(spectatorList){
      this.spectatorList = spectatorList
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
