<template>
  <div class="container">
    <h3 class="mt-2 mb-3 float-left text-primary">Users</h3>
    <!-- Persons Table -->
    <table class="table table-striped" id="datatable">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">First Name</th>
          <th scope="col">Last Name</th>
          <th scope="col">Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <!--"v-for" directive to get API users -->
        <tr v-for="user of users" :key="user.id" class="m-5">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.email }}</td>

          <td>
            <form>
              <button
                v-on:click.prevent="displayUser(user.id)"
                class="btn btn-sm btn-success mr-1"
              >
                Display
              </button>

              <button
                v-on:click.prevent="emitShowModal(user)"
                class="btn btn-sm btn-info mr-1"
              >
                Edit
              </button>
              <button
                v-on:click="deleteUser(user.id)"
                type="submit"
                class="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </form>
          </td>
        </tr>
        <!-- End boucle -->
      </tbody>
    </table>
    <!-- End Table -->
  </div>
</template>

<script>
import { EventBus, EventBusDisplay } from "../main.js";
import axios from 'axios';
export default {
  name: "UsersTable",
  data() {
    return {
      users: [],
      user: "",
      showModal: false,
    };
  },

  async created() {
    try {
      const res = await axios.get(`http://localhost:3000/persons`);
      this.users = res.data;
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    // DELETE request to delete the user
    async deleteUser(id) {
      await fetch(`http://localhost:3000/persons/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .catch((err) => {
          console.error(err);
        });
    },
    async displayUser(id) {
      axios
        .get(`http://localhost:3000/persons/${id}`)
        .then((response) => {
          this.user = response.data;
          console.log('this.user ',this.user );
          EventBusDisplay.$emit("click", this.showModal, this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // Method uses 'EventBus' to be able to emit data globally
    // --> Outputs "user" and "showModal" data
    emitShowModal(user) {
      this.user = user;
      EventBus.$emit("click", this.showModal, this.user);

      console.log(this.user);
      console.log("UsersTable:", this.showModal);
    },
  },
};
</script>

<style scoped>
th {
  padding-left: 1.2rem;
}
</style>
