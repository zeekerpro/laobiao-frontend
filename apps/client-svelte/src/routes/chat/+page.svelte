<script lang="ts">
import { useCompletion } from "ai/svelte";
  import Icon from "@iconify/svelte"

  const { input, handleSubmit, completion } = useCompletion({
    api: '/api/completion',
  });

  let isFocus = false

  function autoFocusAction(node :HTMLInputElement){
    if(!isFocus){
      node.focus()
      isFocus = true
    }
  }

</script>

<main>
  <p>{$completion}</p>

  <form
    on:submit={handleSubmit}
    class="fixed-silky bottom-0 left-0 right-0
      pb-3 px-3
      bg-base-300
      bg-opacity-30
    "
    >
    <label for=""
      class="block w-full text-center my-4 text-sm italic
      ">
      input chat name {isFocus}
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
