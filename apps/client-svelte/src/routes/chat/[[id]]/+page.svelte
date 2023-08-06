<script lang="ts">
  import { useChat, type UseChatHelpers } from "ai/svelte";
  import Icon from "@iconify/svelte"
  import type { Message } from "ai";
  import { db } from "$db";
  import { page } from "$app/stores";
  import { showView } from "$stores/viewStack";
  import MarkdownIt from "markdown-it";
  import hljs from 'highlight.js'

  const md = new MarkdownIt({
    linkify: true,
    breaks: true,
    highlight: (str: string, lang: string, attrs: string): string => {
      let content = str
      if (lang && hljs.getLanguage(lang)) {
          try {
              content = hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          } catch (e) {
              console.log(e)
              return str
          }
      } else {
          content = md.utils.escapeHtml(str)
      }

      // join actions html string
      lang = (lang || 'txt').toUpperCase()
      return  `
        <div class="mockup-code text-sm min-w-0">
          <pre><code>${content}</code></pre>
        </div>
      `
    },
  });

  let chat = null;

  let initialMessages = []

  let chatHelper: UseChatHelpers

  let isLoading = false

  $: if($showView){ initChat() }

  // init chat helper if initialMessages is changed
  $: {
    chatHelper = useChat({
      initialMessages: initialMessages,
      onFinish: persistChat,
      onError: (error: Error) => isLoading = false
    });
  }
  $: input = chatHelper.input
  $: messages = chatHelper.messages
  $: error = chatHelper.error

  async function submitHandler(e: SubmitEvent) {
    if(isLoading || !$input.trim().length ){ return }
    isLoading = true
    chatHelper.handleSubmit(e)
  }

  async function initChat() {
    const id = Number($page.params.id)
    if(!!id){
      chat = await db.chats.get(id)
      initialMessages = await db.messages.where({chatId: id}).toArray()
    }else{
      chat = null;
      initialMessages = []
    }
  }

  async function persistChat(message: Message) {
    isLoading = false
    // create chat
    if(!chat){
      const newChat = { name: $messages[0].content, createdAt: new Date(), updatedAt: new Date() }
      let id = await db.chats.add(newChat)
      chat = await db.chats.get(id)
    }
    // save last 2 messages
    const messagesForDb = $messages.slice(-2).map((message) => {
      // db will generate id, we need to remove id from message
      const {id, ...rest} = message
      return {chatId: chat.id, ...rest}
    })
    db.messages.bulkAdd(messagesForDb)
    if(chat.createdAt == null) db.chats.update(chat.id, { createdAt: new Date() })
    db.chats.update(chat.id, { updatedAt: new Date() })
  }

  let textareaRef: HTMLTextAreaElement;
  function adjustTextareaHeight(){
    if(!textareaRef){ return }
    textareaRef.style.height = "auto";
    textareaRef.style.height = (textareaRef.scrollHeight)+"px";
  }

  function copyContent(e, content: string){
    e.preventDefault()
    if(!content){ return }
    if(navigator.clipboard){
      navigator.clipboard.writeText(content)
    }else{
      const el = document.createElement('textarea');
      el.style.opacity = "0";
      el.value = content;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      el.remove()
    }

  }

</script>

<main >
  <div class="mb-32">

    {#each $messages as message}

    <div class="pt-8 pb-3 px-2 relative shadow-[0_1px_2px_-2px_hsl(var(--sf))] ">

      <Icon
        icon="{ message.role == 'user' ? 'radix-icons:avatar' : 'ri:openai-fill' }"
        class="w-7 h-7 absolute top-8 left-2
          {message.role == 'user' ? '' : 'text-green-600'}
         "
      />

      <div class="ml-10 flex flex-col">

        <div class="w-11/12 hover:cursor-text">
          {@html md.render(message.content)}
        </div>

        <div class="self-end mt-4 mr-4">
          {#if message.role == 'user'}
            <button
              data-tip="edit"
              class="tooltip text-3xs hover:text-info tooltip-info"
              on:click={() => $input = message.content }
              >
              <Icon icon="raphael:edit" class="text-3xs hover:text-success text-gray-400" ></Icon>
            </button>
          {:else}
            <button
              data-tip="copy"
              class="tooltip text-3xs hover:text-success tooltip-success"
              on:click|preventDefault={async () => {
                await navigator.clipboard.writeText(message.content)
              }}
              >
              <Icon icon="uiw:copy" class="text-3xs hover:text-success text-gray-400" ></Icon>
            </button>
          {/if}

        </div>

      </div>

    </div>

    {/each}
  </div>

  <form on:submit|self|trusted={submitHandler}
    class="
      fixed-silky bottom-0 left-0 right-0
      pb-12 px-3
      bg-base-300
      bg-opacity-75
      backdrop-filter
    "
    >
    <label for="" class="w-full text-center my-3 italic text-sm flex justify-center">
      {#if isLoading}
        <Icon icon="eos-icons:three-dots-loading" class="text-2xl"></Icon>
      {:else}
        {$input ? 'Press "sent button" to send' : 'Send a message'}
      {/if}
    </label>
    <div class="flex flex-nowrap
      rounded-lg
      overflow-clip
      shadow-2xl
      bg-base-100
      ">
      <textarea
        bind:this={textareaRef}
        bind:value={$input}
        rows="1"
        class="
          grow
          outline-none
          bg-transparent
          px-3 py-3
          min-h-12
          max-h-36
          overflow-y-scroll
          scrollbar-hide
        "
        on:input={adjustTextareaHeight}
      />
      <button type="submit" class="p-1 h-12 self-end">
        <Icon icon="fa:send"
          class="h-5 w-5 mr-1 transition {!!$input ? 'text-sky-600 scale-125' : 'text-gray-500'} "
          >
        </Icon>
      </button>
    </div>

    {#if $error}
      <span class="w-full text-left mt-2 italic text-xs text-error">
        { $error.message }
      </span>
    {/if}
  </form>


</main>
