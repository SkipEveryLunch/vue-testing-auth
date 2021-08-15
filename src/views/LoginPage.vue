<template>
  <div>
    Login Page
    <button data-testid="login-btn" @click="onSubmit">Login Button</button>
  </div>
</template>
<script>
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const onSubmit = async () => {
      try {
        const res = await axios.post(
          '/api/login',
          {},
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          try {
            const { data, status } = await axios.get('/api/currentUser', {
              withCredentials: true,
            });
            if (status === 200) {
              store.dispatch('setUser', data);
            }
            router.push('/users');
          } catch (e) {}
        }
      } catch (e) {}
    };
    return {
      onSubmit,
    };
  },
};
</script>
