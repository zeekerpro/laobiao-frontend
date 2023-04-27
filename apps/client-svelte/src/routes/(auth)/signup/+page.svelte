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

<div class="signup-form divide-y pb-8 flow-root">

  <div class="flex justify-center items-center my-5">
    <h3 class="text-xl font-semibold text-center">Sign Up</h3>
  </div>

  <div class="px-4">

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

    <div class="form-control my-3">
      <label class="cursor-pointer flex gap-1">
        <input type="checkbox" checked="{conditionChecked}" class="checkbox checkbox-xs" />
        <span class="text-gray-500 text-xs">
        Creating An Account Means You’re Okay With Our Terms Of Service And Privacy Policy My Preference
        </span>
      </label>
    </div>

    <button class="btn btn-primary w-full mt-5">Create Account</button>

  </div>

</div>
