<script>

  let signupFormOptions = [
    {
      name: 'username',
      type: "text",
      placeholder: "username",
      value: "",
      label: "Username",
    },
    {
      name: 'email',
      type: "email",
      placeholder: "email",
      value: "",
      label: "Email",
    },
    {
      name: 'phone',
      type: "tel",
      placeholder: "phone",
      value: "",
      label: "Phone",
    },
    {
      name: 'password',
      type: "password",
      placeholder: "password",
      value: "",
      label: "Password",
    },
    {
      name: 'password_confirmation',
      type: "password",
      placeholder: "password confirmation",
      value: "",
      label: "Password Confirmation",
    },
  ];

  let conditionChecked = false;

</script>

<div class="signup-form pb-8 flow-root">

  <h3 class="my-5 ml-8 text-xl font-bold text-left uppercase">Sign Up</h3>

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

    <div class="form-control my-6">
      <label class="cursor-pointer flex gap-1">
        <input type="checkbox" checked="{conditionChecked}" class="checkbox checkbox-xs" />
        <span class="text-xs">
        Creating An Account Means You’re Okay With Our Terms Of Service And Privacy Policy My Preference
        </span>
      </label>
    </div>

    <button class="btn btn-primary w-full">Create Account</button>

    <div class="p-5">
      <p class="text-sm text-center italic">
        Have an account already?
        <a class="text-accent-focus font-medium capitalize not-italic" href="/signin"> Sign In</a>
      </p>
    </div>

  </div>

</div>
