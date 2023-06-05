<script lang="ts" context="module">
  export type LbFromItemOption = {
    name: string,
    type: "text" | "password" | "email" | "tel" | "number" | "url" | "search" | "date" | "time" | "datetime-local" | "month" | "week" | "color",
    value: string
    label: string,
    placeholder?: string,
    message?: string,
    schema?: StringSchema
    autofocus?: boolean
  }
</script>

<script lang="ts">
  import type { StringSchema } from "yup";

  export let option: LbFromItemOption

  function typeAction(node :HTMLInputElement){ node.type = option.type }

  let isFocus = false

  function autoFocusAction(node :HTMLInputElement){
    if(option.autofocus && !isFocus){
      node.focus()
      isFocus = true
    }
  }

  function focusHandler(){
    option.message = ''
    isFocus = true
  }

</script>

<div class="form-control my-3">
  <lable class="label">
    <span class="label-text font-semibold capitalize">{option.label}</span>
  </lable>
  <input
    name="{option.name}"
    use:typeAction
    use:autoFocusAction
    bind:value="{option.value}"
    placeholder="{option.placeholder}"
    class="input input-bordered rounded {option.message ? 'input-error' : ''} {isFocus ? 'input-primary' : ''}"
    on:focus="{focusHandler}"
    on:focusout="{() => isFocus = false}"
    />
  <label for="{option.name}" class="label">
    <span class="label-text-alt text-error">{option.message}</span>
  </label>
</div>
