<script setup>
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

import {ref} from "vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient()

const Database = ref('')
const Messages = ref([])
const newMessage = ref('')

const MyID = ref(user.value.id)

const email = ref(user.value.email)
const jmeno = ref('')
const prijmeni = ref('')
const skola = ref('')
const obor = ref('')
const full_name = ref('')
const username = ref('')

const nadpis = ref('')

const { data } = await supabase
    .from('profiles')
    .select(`first_name, last_name, skola, obor, full_name, username`)
    .eq('id', user.value.id)
    .single()

if(data) {
  jmeno.value = data.first_name
  prijmeni.value = data.last_name
  skola.value = data.skola
  obor.value = data.obor
  full_name.value = data.full_name
  username.value = data.first_name + ' ' + data.last_name
}

if(props.type === 'obor') {
  Database.value = 'oborychat'
  nadpis.value = obor.value;
}
else if(props.type === 'skola') {
  Database.value = 'skolachat'
  nadpis.value = skola.value;
}

/*
async function sendMessage() {
  const user = useSupabaseUser();

  // check if the user has any username, if not use full_name
  //const username = user.value.username =! null ? user.value.username : user.value.full_name;
  if (username.value == null || username.value === '') {
    username.value = full_name.value
  }

  const { error } = await supabase
      .from(Database.value)
      .insert(
          {
            text: newMessage.value,
            user_id: user.value.id, // Use any unique identifier for the user
            // send current timestamp
            user_name: username.value,
            skola: skola.value,
            timestamp: new Date().toISOString(),
          });

  newMessage.value= '';
}
*/

async function sendMessage() {
  const user = useSupabaseUser();

  // check if the user has any username, if not use full_name
  //const username = user.value.username =! null ? user.value.username : user.value.full_name;
  if (username.value == null || username.value === '') {
    username.value = full_name.value
  }
  console.log(Database.value)
  const { error } = await supabase
      .from(Database.value)
      .insert(
          {
            text: newMessage.value,
            user_id: user.value.id, // Use any unique identifier for the user
            // send current timestamp
            user_name: username.value,
            skola: skola.value,
            timestamp: new Date().toISOString(),
          });
  newMessage.value= '';
}

async function loadMessages() {
  const { data, error } = await supabase
      .from(Database.value)
      .select('*')
      .order('timestamp', { ascending: true })
  if (error) {
    console.log(error)
  } else {
    Messages.value = data
  }
  console.log(Messages.value)
}

console.log(Database.value)
loadMessages()

const handleInserts = (payload) => {
  // add the new message to the messages array
  Messages.value.push(payload.new)
  // await for 5 ms
  setTimeout(() => {
    ScrollToBottom();
  }, 5);
  //ScrollToBottom();
};

function ScrollToBottom() {
  const element = document.getElementById('messagesContainer')
  element.scrollTop = element.offsetHeight + element.scrollHeight
}


// Listen to inserts
supabase
    .channel(Database.value)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: Database.value }, handleInserts)
    .subscribe();



</script>

<template>
  <div class="tenBorder">
    <div class="chat">
      <div class="chatHeader">
        <h3>{{ skola }}</h3>
      </div>
      <!-- Message div -->
      <div class="messageContainer" id="messagesContainer">


        <!-- Rozlišení zpráv a načtení zprav z databáze-->
        <div class="zprava" v-for="item in Messages">
          <div v-if="item.skola === skola">
            <div class="pfp">

            </div>
            <div class="username">
              {{item.user_name}}

            </div>
            <div class="time">
              {{item.timestamp.toString()}}

            </div>
            <div class="message sent" v-if="item.user_id === MyID">
              {{item.text}}
            </div>
            <div class="message received" v-else>
              {{item.text}}
            </div>
          </div>
        </div>

        <!-- Add more messages as needed -->
      </div>
      <div class="chatInput">
        <input id="inputText" type="text" placeholder="Type your message..." v-model="newMessage" @keyup.enter="sendMessage">
        <button class="buttons" @click="sendMessage">Send</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
#inputText {

  padding: 0;
  margin-top: 20px;

  letter-spacing: 0.025em;
  border: none;
  background: transparent;
  text-align: center;
  outline: none;
  color: #ffffff;
  border-bottom: solid thin rgba(238, 238, 238, 0.12);
}

.skola{
  color: #916ed9;
}

#container{
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0;
  padding: 0;
  background: linear-gradient(rgba(10, 10, 10, 0.6), rgba(0, 0, 0, 0.9)), repeating-linear-gradient(0, transparent, transparent 2px, black 3px, black 3px), url("assets/Images/background.webp");
  background-size: cover;
  background-position: center;
  font-family: 'Oxanium', sans-serif;
}

#chatContainer{
  display: flex;
  margin-top: 85px;
  height: fit-content;
  justify-content: center;
  align-items: center;
}

.tenBorder {
  flex: 1;
  border-radius:20px;
  padding: 3rem;
  text-shadow: 0 1px #00000010;
  margin: 8rem auto;
  border: #ffffff;
  backdrop-filter: blur(8px);
  border: 1px white solid;
}
.chat{
  height: 70vh;
  width: 80vh;

}
.menuChat{
  height: 70vh;
  width: 20vh;

}

.tenBorder:first-child{
  margin-right: 20px;
}
.menuChat ul {
  list-style: none;
  padding: 0;
}

.menuChat li {
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
  /* Add any additional styling you prefer for each list item */
}
.chatHeader {
  text-align: center;
  margin-bottom: 20px;
  color: white;
}

.messageContainer {
  margin: 10px 0;
  padding: 10px;
  height: fit-content;
  max-height: 50vh; /* Set a maximum height for the container */
  overflow-y: auto;
}

.message {
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  max-width: 70%;
  word-wrap: break-word;

}

.received {
  color: #73faf8;
  font-size: large;
  align-self: flex-start;
}

.sent {
  color: #d496fd;
  font-size: large;
  align-self: flex-end;
}

.username{
  color: white;
  font-weight: bolder;
  font-size: larger;
}
.time{
  color: #C6B8C5;
  font-size: smaller;
  font-weight: lighter;
}
.zprava{
  margin-top: 50px;
}
.zprava:hover{
  background-color: rgba(53, 38, 72, 0.58);
  border-radius: 8px;
}

.chatInput {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin-left: 50px ;
  margin-right: 50px ;
  margin-bottom: 30px;
  padding: 10px;
  width: 80%;
}

.chatInput input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
}


.buttons{
  background-color: #d496fd;
  color: #0a0a0a;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  font-family: 'Oxanium', sans-serif;
  margin-left: 20px;
  margin-top: 20px;
  font-size: 1.1em;
}
.buttons:hover{
  background-color: #ad33ff;
  transform: scale(1.05);
  color: #fff;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;
}

</style>