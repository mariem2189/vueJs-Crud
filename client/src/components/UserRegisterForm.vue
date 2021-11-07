<template>
  <div class="container">
      <button v-on:click="showModal = !showModal" class="btn btn-lg btn-outline-primary float-right">Add User</button>

    <!-- Add/remove "show" class -->
    <div v-bind:class="modalClass" class="modal-container">
      <div class="user-modal">
        <form>
          <div class="form-group">
            <label for="name">First Name</label>
            <input required value="" type="text" id="firstNameRegister" class="form-control"/>
          </div>
          <div class="form-group">
            <label for="name">Last Name</label>
            <input required value="" type="text" id="lastNameRegister" class="form-control"/>
          </div>
    
          <div class="form-group">
            <label for="email">Email</label>
            <input required value="" type="email" id="emailRegister" class="form-control"/>
          </div>
          
          <!-- when you click, "showModal" becomes false -->
          <button v-on:click.prevent="showModal = !showModal" class="btn btn-secondary mr-1">Cancel</button>
          <button v-on:click="createUser()" type="submit" class="btn btn-primary">Save</button> 
        </form>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'UserRegisterForm',
  data() {
    return {
      users: [],
      showModal: false,
    };
  },
  methods: {
    // POST request to create a new user
    async createUser() {
      await fetch('http://localhost:3000/persons', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          firstName: document.getElementById('firstNameRegister').value,
          lastName: document.getElementById('lastNameRegister').value,
          email: document.getElementById('emailRegister').value,
          
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        this.users = data;
        // console.log('caiu aqui');
      })
      .catch((err) => {
        console.error(err);
      });
    }
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
.modal-container {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;

  display: flex;
  align-items: center;
  justify-content: center;
  
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease-in-out;
}

.modal-container.show {
  opacity: 1;
  pointer-events: auto;
}

.user-modal {
  color: #535353;
  background-color: #fff;
  background-image: url("../assets/background.jpg");
  width: 450px;
  padding: 40px 50px;
  max-width: 100%;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.user-modal h1 {
  margin: 0;
}

.user-modal p {
  opacity: 0.9;
}
</style>
