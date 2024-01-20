<template>
  <div>
    <div v-for="message in messages" :key="message.id">
      {{ message.text }} - {{ message.user }}
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" class="input centered" />
  </div>
</template>

<style scoped>
.input {
  width: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: red;
  height: 50px;
}

</style>

<script>
export default {
  data() {
    return {
      messages: [],
      newMessage: '',
    };
  },
  async created() {
    // Add real-time listener for new messages
    const { data } = await this.$supabase
        .from('messages')
        .on('INSERT', payload => {
          this.messages.push(payload.new);
        })
        .subscribe();
  },
  methods: {
    async sendMessage() {
      // Get authenticated user information
      const user = this.$supabase.auth.user();

      // Send the message to the Supabase table
      await this.$supabase.from('messages').upsert([
        {
          text: this.newMessage,
          user: user.email, // Use any unique identifier for the user
        },
      ]);

      // Clear the input field after sending the message
      this.newMessage = '';
    },
  },
};
</script>