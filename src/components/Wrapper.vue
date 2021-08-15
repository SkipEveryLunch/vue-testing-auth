<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>
<script>
import Header from './Header.vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    onMounted(async () => {
      try {
        const { data, status } = await axios.get('/api/currentUser');
        if (status === 200) {
          store.dispatch('setUser', data);
        } else {
          store.dispatch('discardUser');
        }
      } catch (e) {
        store.dispatch('discardUser');
      }
    });
  },
};
</script>
