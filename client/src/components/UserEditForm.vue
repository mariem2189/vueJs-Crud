<template>
  <div class="container">
    <!--Add/remove "show" class -->
    <div v-bind:class="modalClass" class="modal-container">
      <div class="user-modal">
        <h3 class="text-info">Edit user</h3>
        <form>
          <div class="form-group">
            <label for="">Fist Name</label>
            <input v-bind:value="user.firstName" required type="text" id="fistNameEdit" class="form-control"/>
          </div>
           <div class="form-group">
            <label for="">Last Name</label>
            <input v-bind:value="user.lastName" required type="text" id="lastNameEdit" class="form-control"/>
          </div>
  
          <div class="form-group">
            <label for="">Email</label>
            <input v-bind:value="user.email" required type="email" id="emailEdit" class="form-control"/>
          </div>

          <!-- when you click, "showModal" becomes false -->
          <button v-on:click.prevent="showModal = !showModal" class="btn btn-secondary mr-1">Cancel</button>
          <button v-on:click="updateUser(user.id)" type="submit" class="btn btn-primary">Save</button> 
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import { EventBus } from '../main.js';

export default {
  name: 'UserEditForm',
  data() {
    return {
      users: [],
      user: '',
      showModal: false
    }
  },
  methods: {
    // PUT request to update user information
    async updateUser(id) {
      await fetch(`http://localhost:3000/persons/${id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ 
          firstName: document.getElementById('fistNameEdit').value,
          lastName: document.getElementById('lastNameEdit').value,
          email: document.getElementById('emailEdit').value
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
        console.log('updated');
      })
      .catch((err) => {
        console.error(err);
      });
    }
  },
  // When creating the component, we receive the data emitted from the 'EventBus' here in this component
  created() {
    // evento de click
    EventBus.$on('click', (modal, user) => {
      this.showModal = !modal;
      this.user = user;
      console.log('showModal', this.showModal);
      console.log('modal', modal)
    })
  },
  // Function to put or remove the "show" class in Modal
  computed: {
    modalClass() {
      return this.showModal ? 'show' : '';
    }
  }
  
};
</script>

<style>
/*It is using the same styling of the registration modal */
</style>
