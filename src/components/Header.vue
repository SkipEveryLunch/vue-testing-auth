<template>
  <div>
    <router-link to="/users">
      Users
    </router-link>
  </div>
  <div v-if="!user">
    <router-link data-testid="login-link" to="/login">
      Login
    </router-link>
  </div>
  <div v-else>
    <span @click="logout" data-testid="logout-link">
      Logout
    </span>
  </div>
</template>
<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import axios from 'axios';
export default {
  setup() {
    const store = useStore();
    const user = computed(() => {
      return store.state.user;
    });
    const logout = async () => {
      const res = await axios.delete('/api/logout');
      store.dispatch('discardUser');
    };
    return {
      user,
      logout,
    };
  },
};
</script>
