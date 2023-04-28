<script>
  import Forgot from "@views/authentication/Forgot.svelte";
</script>

<svelte:head>
  <title>ForgetPassword</title>
</svelte:head>

<Forgot />

<div class="bg-gray-100 p-5">
  <p class="text-xs text-gray-500 font-light text-right">
    <a class="text-light font-medium lowercase italic
      hover:text-primary hover:underline
      "
      href="/signin"
      >
      back to sign in
    </a>
  </p>
</div>

