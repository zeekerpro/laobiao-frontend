<script lang="ts" context="module">
  export type LbFromItemOption = {
    name: string,
    type: "text" | "password",
    value: string
    label: string,
    placeholder?: string,
    message?: string,
    schema?: StringSchema
  }
</script>

<script lang="ts">
  import type { StringSchema } from "yup";

  export let option: LbFromItemOption
</script>

<div class="form-control my-3">
  <lable class="label">
    <span class="label-text font-semibold">{option.label}</span>
  </lable>
  <input
    name="{option.name}"
    type="{option.type}"
    placeholder="{option.placeholder}"
    class="input input-bordered rounded {option.message ? 'input-error' : ''}"
    on:focus="{ () => option.message = '' }"
    />
  <label for="{option.name}" class="label">
    <span class="label-text-alt text-error">{option.message}</span>
  </label>
</div>
