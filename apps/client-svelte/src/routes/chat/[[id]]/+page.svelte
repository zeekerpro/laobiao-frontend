<script lang="ts">
  import { useChat, type UseChatHelpers } from "ai/svelte";
  import Icon from "@iconify/svelte"
  import { dateFormatter } from "$utils/formatter";
  import type { Message } from "ai";
  import { db } from "$db";
  import { page } from "$app/stores";
  import { showView } from "$stores/viewStack";

  let chat = null;

  let initialMessages = []

  let chatHelper: UseChatHelpers

  $: if($showView){
    initChat(Number($page.params.id))
  }

  // init chat helper if initialMessages is changed
  $: {
    chatHelper = useChat({
      onFinish: persistChat,
      initialMessages: initialMessages
    });
  }
  $: input = chatHelper.input
  $: messages = chatHelper.messages
  $: isLoading = chatHelper.isLoading

  async function submitHandler(e: SubmitEvent) {
    if($isLoading){ return }
    chatHelper.handleSubmit(e)
  }

  async function initChat(id: number) {
    if(!!id){
      chat = await db.chats.get(id)
      initialMessages = await db.messages.where({chatId: id}).toArray()
    }else{
      chat = null;
      initialMessages = []
    }
  }

  async function persistChat(message: Message) {
    // create chat
    if(!chat){
      let id = await db.chats.add({ name: $messages[0].content })
      chat = await db.chats.get(id)
    }
    // save last 2 messages
    const messagesForDb = $messages.slice(-2).map((message) => {
      // db will generate id, we need to remove id from message
      const {id, ...rest} = message
      return {chatId: chat.id, ...rest}
    })
    db.messages.bulkAdd(messagesForDb)
  }

</script>

<main>
  <div class="mb-32">

    {#each $messages as message}
    <div class="chat { message.role == 'user' ? 'chat-end' : 'chat-start' }">
      <div class="chat-image avatar">
        <div class="w-10 rounded-full">
          <Icon icon="{ message.role == 'user' ? 'radix-icons:avatar' : 'ri:openai-fill' }" class="w-10 h-10" ></Icon>
        </div>
      </div>


      <div class="chat-bubble {message.role == 'user' ? 'chat-bubble-primary' : 'chat-bubble-info'}">
         {message.content}
      </div>

      <div class="chat-footer">
        <time class="text-xs opacity-50">{ dateFormatter()(message.createdAt)}</time>
      </div>
    </div>
    {/each}
  </div>

  <form on:submit={submitHandler}
    class="
      fixed-silky bottom-0 left-0 right-0
      pb-12 px-3
      bg-base-300
      bg-opacity-75
      backdrop-filter
    "
    >
    <label for="" class="block w-full text-center my-4 italic ">
      input chat name
    </label>
    <div class="flex flex-wrap
      rounded-lg
      overflow-clip
      shadow-2xl
      bg-base-100
      ">
      <input
        bind:value={$input}
        placeholder="Write a message ..."
        class="
          grow
          outline-none
          bg-transparent
          px-3 py-0
          h-12
        "
      />
      <button type="submit" class="pr-1">
        {#if $isLoading}
          <Icon icon="eos-icons:three-dots-loading" class="text-3xl"></Icon>
        {:else}
          <Icon icon="fa:send"
            class="h-5 w-5 mr-1 transition {!!$input ? 'text-sky-600 scale-125' : 'text-gray-500'} "
            >
          </Icon>
        {/if}
      </button>
    </div>
  </form>

</main>
