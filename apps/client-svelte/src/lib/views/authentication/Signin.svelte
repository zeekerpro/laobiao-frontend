<script>

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

</script>

<div class="signin-form divide-y pb-8 flow-root">

  <div class="flex justify-center items-center my-5">
    <h3 class="text-xl font-semibold text-center">Sign In</h3>
  </div>

  <div class="px-8">

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
        <span class="text-gray-500 text-xs">
          remember me
        </span>
      </label>
      <span class="label-text-alt text-xs text-gray-600">
        <a href="/forgot" class="hover:underline text-primary italic">
          Forgot password?
        </a>
      </span>
    </div>

    <button class="btn btn-primary w-full">Sign In</button>

  </div>

</div>
