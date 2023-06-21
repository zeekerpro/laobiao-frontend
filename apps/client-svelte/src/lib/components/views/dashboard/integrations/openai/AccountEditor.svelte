<script lang="ts">
  import * as yup from "yup";
  import LbForm from "$components/form/LbForm.svelte";
  import type { LbFromItemOption } from "$components/form/LbFormItem.svelte";
  import { plainToInstance } from "class-transformer";
  import OpenaiAccount from "$models/OpenaiAccount";

  let formOptions :Array<LbFromItemOption> = [
    {
      name: 'email',
      type: "email",
      placeholder: "email",
      value: "",
      label: "Email",
      message: "",
      schema: yup.string().email().required()
    },
    {
      name: 'apiKey',
      type: "text",
      placeholder: "Openai API Key",
      value: "",
      label: "Openai API Key",
      message: "",
      schema: yup.string().required().matches(/^sk-[a-zA-Z0-9]{32,}$/, 'Openai API key is invalid')
    },
  ];

  let isLoading = false;

  let formRef :LbForm;

  async function handleSubmit(e :SubmitEvent) {
    e.preventDefault();
    const formData = await formRef.validate();
    if(!formData){ return; }

    // @ts-ignore
    const value = Object.fromEntries(formData.entries());
    const account = plainToInstance(OpenaiAccount, value)

    isLoading = true;
    let res = await OpenaiAccount.create(account)
    isLoading = false
    if(!res.isSuccess){
      const errors = res.data;
      Object.keys(errors).forEach(key => {
        // @ts-ignore
        formOptions.find(item => item.name === key).message = errors[key][0];
      })
      formOptions = formOptions
    }
  }
</script>

<div class="signup-form pb-8 flow-root">

  <h3 class="ext-xl font-bold text-left uppercase">
    Add Openai Account
  </h3>

  <LbForm options={formOptions} bind:this={formRef} {handleSubmit} >

    <button class="btn btn-primary w-full {isLoading ? 'loading' : ''}">
      <span class="{isLoading ? 'loading loading-spinner' : ''}"></span>
      submit
    </button>

  </LbForm>

</div>

