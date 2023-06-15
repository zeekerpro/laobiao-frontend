<script lang="ts">
  import LbForm from "$components/form/LbForm.svelte";
import type { LbFromItemOption } from "$components/form/LbFormItem.svelte";
  import * as yup from "yup";

  let forgotFormOptions :Array<LbFromItemOption> = [
    {
      name: 'email',
      type: "text",
      placeholder: "name@example.com",
      value: "",
      label: "email address",
      message: "",
      schema: yup.string().email().required()
    }
  ];

  let forgotFormRef :LbForm;
  let isLoading = false;

  async function handleSubmit() {
    const formData = await forgotFormRef.validate();
    if(!formData){ return; }
  }

</script>

<div class="forgot-from pb-8 flow-root">

  <div class="flex justify-center items-center my-5">
    <h3 class="text-xl font-semibold text-center capitalize">
      Forgot Password ?
    </h3>
  </div>

  <p class="px-8 mt-8">
    Enter the email address you used when you joined and we’ll send you instructions to reset your password.
  </p>

  <LbForm class="px-8"
    options={forgotFormOptions}
    bind:this={forgotFormRef} {handleSubmit}
    >

    <button class="btn btn-primary w-full capitalize ">
      <span class="{isLoading ? 'loading loading-spinner' : ''}"></span>
      send reset instructions
    </button>

    <div class="p-5">
      <p class="text-xs font-light text-right">
        <a class="text-accent-focus font-medium lowercase italic hover:underline "
          href="/signin"
          >
          back to sign in
        </a>
      </p>
    </div>
  </LbForm>

</div>
