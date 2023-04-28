<script>

  let signupFormOptions = [
    {
      name: 'email',
      type: "text",
      placeholder: "name@example.com",
      value: "",
      label: "email address",
    }
  ];

</script>

<div class="forgot-from divide-y pb-8 flow-root">

  <div class="flex justify-center items-center my-5">
    <h3 class="text-xl font-semibold text-center capitalize">
      Forgot Password ?
    </h3>
  </div>

  <div class="px-8">

    <p class="mt-8">
      Enter the email address you used when you joined and we’ll send you instructions to reset your password.
    </p>

    {#each signupFormOptions as option }
      <div class="form-control my-6">
        <lable class="label">
          <span class="label-text font-semibold capitalize">{option.label}</span>
        </lable>
        <input
          name="{option.name}"
          type="{option.type}"
          placeholder="{option.placeholder}"
          class="input input-bordered rounded"
          />
      </div>
    {/each}

    <button class="btn btn-primary w-full capitalize">send reset instructions</button>

  </div>

</div>
