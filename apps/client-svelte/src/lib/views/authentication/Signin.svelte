<script lang="ts">
  import { userService } from "$apis";
  import * as yup from "yup";
  import type { LbFromItemOption } from "$components/form/LbFormItem.svelte";
  import LbForm from "$components/form/LbForm.svelte";
  import { goto } from "$app/navigation";
    import { session } from "$stores/session";

  let signinFormOptions :Array<LbFromItemOption> = [
    {
      name: 'account',
      type: "text",
      placeholder: "account",
      value: "",
      label: "Account",
      message: "",
      schema: yup.string().required()
    },
    {
      name: 'password',
      type: "password",
      placeholder: "password",
      value: "",
      label: "Password",
      message: "",
      schema: yup.string().required()
    },
  ];

  let conditionChecked = false;
  let isLoading = false;

  let signinFormRef :LbForm;

  async function handleSubmit() {
    const formData = await signinFormRef.validate();
    if(!formData){ return; }

    // @ts-ignore
    const value = Object.fromEntries(formData.entries());

    isLoading = true;
    let res = await userService.signin(value)
    isLoading = false
    if(res.isSuccess){
      goto('/')
      $session.user = res.data
    }else{
      const error = res.data?.error;
      // @ts-ignore
      signinFormOptions.find(item => item.name === error.attribute).message = error.message;
      signinFormOptions = signinFormOptions
    }
  }
</script>

<div class="signin-form pb-8 flow-root">

  <h3 class="my-5 ml-8 text-xl font-bold text-left uppercase">Sign In</h3>

  <LbForm options={signinFormOptions} bind:this={signinFormRef} {handleSubmit} >

    <div class="my-6 flex justify-between">
      <label class="cursor-pointer flex gap-1">
        <input type="checkbox" checked="{conditionChecked}" class="checkbox checkbox-xs" />
        <span class="text-xs">
          remember me
        </span>
      </label>
      <span class="label-text-alt text-xs">
        <a href="/forgot" class="hover:underline italic">
          Forgot password?
        </a>
      </span>
    </div>

    <button type="submit" class="btn btn-primary w-full " >
      <span class="{isLoading ? 'loading loading-spinner' : ''}" ></span>
      Sign In
    </button>

    <div class="p-5">
      <p class="text-sm font-light text-center italic">
        Don't have an account?
        <a class="text-accent-focus font-medium not-italic capitalize" href="/signup"> Sign up</a>
      </p>
    </div>
  </LbForm>

</div>
