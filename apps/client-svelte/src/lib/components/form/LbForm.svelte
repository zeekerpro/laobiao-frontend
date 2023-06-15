<script lang="ts">
  import LbFormItem from "$components/form/LbFormItem.svelte";
  import * as yup from "yup";
  import type { ValidationError } from "yup";
  import type { LbFromItemOption } from "./LbFormItem.svelte";

  let formRef :HTMLFormElement;

  export let options :Array<LbFromItemOption>;

  export {classes as class}
  let classes = ''

  export let handleSubmit :(e? :SubmitEvent) => void = () => {};

  export async function validate() :Promise<false | FormData> {
    const data = new FormData(formRef);
    // @ts-ignore
    const value = Object.fromEntries(data.entries());

    const shape = Object.fromEntries(
      options.map((option) => {
        return [option.name, option.schema];
      })
    ) as yup.ObjectShape
    const schema = yup.object().shape(shape);

    try {
      await schema.validate(value, {abortEarly: false});
      return data;
    } catch (error :unknown) {
      (error as ValidationError).inner.forEach((err: any) => {
        let option = options.find((option) => option.name === err.path);
        if (option) {
          option.message = err.message;
        }
      });
      options =  options;
      return false;
    }
  };
</script>

<form class="{classes}"
  bind:this={formRef}
  on:submit={handleSubmit}
  >

  {#each options as option }
    <LbFormItem {option} />
  {/each}

  <slot></slot>

</form>
