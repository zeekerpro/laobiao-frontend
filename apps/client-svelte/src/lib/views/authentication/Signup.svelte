<script lang="ts">
  import * as yup from "yup";
  import LbForm from "@components/form/LbForm.svelte";
  import type { LbFromItemOption } from "@components/form/LbFormItem.svelte";
  import { userService } from "@apis";

  let signupFormOptions :Array<LbFromItemOption> = [
    {
      name: 'username',
      type: "text",
      placeholder: "username",
      value: "",
      label: "Username",
      message: "",
      autofocus: true,
      schema: yup.string().required()
    },
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
      name: 'phone',
      type: "tel",
      placeholder: "phone",
      value: "",
      label: "Phone",
      message: "",
      schema: yup.string().required().matches(/^1[3-9]\d{9}$/, 'Phone number is not valid')
    },
    {
      name: 'password',
      type: "password",
      placeholder: "password",
      value: "",
      label: "Password",
      message: "",
      schema: yup.string().required().min(8).max(16).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number')
    },
    {
      name: 'password_confirmation',
      type: "password",
      placeholder: "password confirmation",
      value: "",
      label: "Password Confirmation",
      message: "",
      schema: yup.string().required().oneOf([yup.ref('password'), ''], 'Passwords must match')
    },
  ];

  let conditionChecked = false;
  let isLoading = false;

  let signupFormRef :LbForm;

  async function handleSubmit() {
    const formData = await signupFormRef.validate();
    if(!formData){ return; }

    // @ts-ignore
    const value = Object.fromEntries(formData.entries());

    isLoading = true;
    let res = await userService.signup(value)
    isLoading = false
    if(res.isSuccess){

    }else{

    }
  }

</script>

<div class="signup-form pb-8 flow-root">

  <h3 class="my-5 ml-8 text-xl font-bold text-left uppercase">Sign Up</h3>

  <LbForm options={signupFormOptions} bind:this={signupFormRef} {handleSubmit} >

    <div class="form-control my-6">
      <label class="cursor-pointer flex gap-1">
        <input type="checkbox" checked="{conditionChecked}" class="checkbox checkbox-xs" />
        <span class="text-xs">
        Creating An Account Means You’re Okay With Our Terms Of Service And Privacy Policy My Preference
        </span>
      </label>
    </div>

    <button class="btn btn-primary w-full {isLoading ? 'loading' : ''}">
      <span class="{isLoading ? 'loading loading-spinner' : ''}"></span>
      Create Account
    </button>


    <div class="p-5">
      <p class="text-sm text-center italic">
        Have an account already?
        <a class="text-accent-focus font-medium capitalize not-italic" href="/signin"> Sign In</a>
      </p>
    </div>

  </LbForm>

</div>
