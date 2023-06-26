<script lang="ts">
  import { useChat } from "ai/svelte";
  import Icon from "@iconify/svelte"
  import { dateFormatter } from "$utils/formatter";

  const { input, handleSubmit, messages } = useChat();

  let isFocus = false

  function autoFocusAction(node :HTMLInputElement){
    if(!isFocus){
      node.focus()
      isFocus = true
    }
  }
</script>

<main>
  <div class="mb-32">
    {#each $messages as message}
    <div class="chat { message.role == 'user' ? 'chat-end' : 'chat-start' }">
      <div class="chat-header">
        {message.role}
        <time class="text-xs opacity-50">{ dateFormatter()(message.createdAt)}</time>
      </div>
      <div class="chat-bubble {message.role == 'user' ? 'chat-bubble-primary' : 'chat-bubble-info'}">
         {message.content}
      </div>
    </div>
    {/each}
  </div>

  <form
    on:submit={handleSubmit}
    class="fixed-silky bottom-0 left-0 right-0
      pb-12 px-3
      bg-base-300
      bg-opacity-75
      backdrop-filter
    "
    >
    <label for=""
      class="block w-full text-center my-4 text-sm italic
      ">
      input chat name
    </label>
    <div class="flex flex-wrap
      rounded-lg
      overflow-clip
      shadow-2xl
      bg-base-100
      ">
      <input type="text"
        bind:value={$input}
        use:autoFocusAction
        placeholder="Write a message ..."
        on:focus="{() => isFocus = true}"
        on:focusout="{() => isFocus = false}"
        class="
          grow
          outline-none
          bg-transparent
          px-3 py-0
          h-12
        "
      />
      <button type="submit" class="pr-1">
        <Icon icon="fa:send"
          class="h-10 w-10 p-2
          transition
          {!!$input ? 'text-sky-600 scale-125' : 'text-gray-500'}
          ">
        </Icon>
      </button>
    </div>
  </form>
</main>
