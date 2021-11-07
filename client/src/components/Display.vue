<template>
  <div class="container">
    <!--Add/remove "show" class -->
    <div v-bind:class="modalClass" class="modal-container">
      <div class="user-modal">
        <h3 class="text-info">Display user</h3>
        <p>{{ user.firstName }}</p>
        <p>{{ user.lastName }}</p>
        <p>{{ user.email }}</p>
        <button
          v-on:click.prevent="showModal = !showModal"
          class="btn btn-secondary mr-1"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBusDisplay } from "./../main";
export default {
  name: "Display",
  data() {
    return {
      user: "",
      showModal: false,
    };
  },

  // When creating the component, we receive the data emitted from the 'EventBusDisplay' here in this component
  created() {
    EventBusDisplay.$on("click", (modal, user) => {
      this.showModal = !modal;
      this.user = user;
      console.log("showModal", this.showModal);
      console.log("modal", modal);
    });
  },
  // Function to put or remove the "show" class in Modal
  computed: {
    modalClass() {
      return this.showModal ? "show" : "";
    },
  },
};
</script>

<style>
/*It is using the same styling of the registration modal */
</style>
