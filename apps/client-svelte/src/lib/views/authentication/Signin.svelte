<script lang="ts">
  import { userService } from "@apis";

  let signupFormOptions = [
    {
      name: 'account',
      type: "text",
      placeholder: "account",
      value: "",
      label: "Account",
    },
    {
      name: 'password',
      type: "password",
      placeholder: "password",
      value: "",
      label: "Password",
    },
  ];

  let conditionChecked = false;

  function handleSubmit(event :SubmitEvent) {
    event.preventDefault();
    const data = new FormData(event.target as HTMLFormElement);
    // @ts-ignore
    const value = Object.fromEntries(data.entries());

    console.log(value);

    userService.signin(value).then((res) => {
      debugger
      console.log(res);
    });

  }

</script>

<div class="signin-form pb-8 flow-root">

  <h3 class="my-5 ml-8 text-xl font-bold text-left uppercase">Sign In</h3>

  <form class="px-8" on:submit={handleSubmit}>

    {#each signupFormOptions as option }
      <div class="form-control my-3">
        <lable class="label">
          <span class="label-text font-semibold">{option.label}</span>
        </lable>
        <input
          name="{option.name}"
          type="{option.type}"
          placeholder="{option.placeholder}"
          class="input input-bordered rounded"
          />
      </div>
    {/each}

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

    <button type="submit" class="btn btn-primary w-full">Sign In</button>

    <div class="p-5">
      <p class="text-sm font-light text-center italic">
        Don't have an account?
        <a class="text-accent-focus font-medium not-italic capitalize" href="/signup"> Sign up </a>
      </p>
    </div>
  </form>

</div>
