<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@300&family=Oxanium:wght@200;500&display=swap" rel="stylesheet">

  <div id="container" style="max-height: 100%">
    <section id="chatContainer">


      <div class="tenBorder">
        <div class="menuChat">
          <!-- List of people to chat with -->
          <ul>
            <li class="skola">SPOŠDK - SKUPINA</li>
            <NuxtLink to="/chat "><li>Informatici</li></NuxtLink>
            <NuxtLink to="/chat "><li>Chemici</li></NuxtLink>
            <NuxtLink to="/chat "><li>Bezpečáci</li></NuxtLink>


            <!-- Add more list items as needed -->
          </ul>
        </div>

      </div>
      <ChatBox type="skola" v-if="ChatType === 'skola'"/>
      <ChatBox type="obor" v-if="ChatType === 'obor'"/>

    </section>
  </div>

</template>

<script setup>
import ChatBox from "@/components/ChatBox.vue";
import {ref} from "vue";

const user = useSupabaseUser();
const supabase = useSupabaseClient()

const messages = ref([])
const newMessage = ref('')

const ChatType = ref('skola')

const MyID = ref(user.value.id)

const email = ref(user.value.email)
const jmeno = ref('')
const prijmeni = ref('')
const skola = ref('')
const obor = ref('')
const full_name = ref('')
const username = ref('')

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
  username.value = data.username
}

async function sendMessage() {
  const user = useSupabaseUser();

  // check if the user has any username, if not use full_name
  //const username = user.value.username =! null ? user.value.username : user.value.full_name;
  if (username.value == null || username.value === '') {
    username.value = full_name.value
  }

  const { error } = await supabase
      .from('skolachat')
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

//VYTVOŘIT LIST NEBO ARRAY KTERY SE NAPLNI DATY Z DATABAZE
 const Messages = ref([]);




// load messages from database
async function loadMessages() {
  const { data, error } = await supabase
      .from('skolachat')
      .select('*')
      .order('timestamp', { ascending: true })
  if (error) {
    console.log(error)
  } else {
    Messages.value = data
  }
  console.log(Messages.value)
}
loadMessages()

const handleInserts = (payload) => {
  // add the new message to the messages array
  Messages.value.push(payload.new)
  console.log(Messages.value)
};

// Listen to inserts
supabase
    .channel('skolachat')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'skolachat' }, handleInserts)
    .subscribe();


</script>

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

.chatInput {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 0;
  margin: 50px ;

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