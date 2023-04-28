<script>
import Signup from "@views/authentication/Signup.svelte";
</script>

<svelte:head>
  <title>Signup</title>
</svelte:head>

<Signup />

<div class="bg-gray-100 p-5">
  <p class="text-sm text-gray-500 font-light text-center">
    Have an account already ?
    <a class="text-primary font-medium" href="/signin"> Sign In</a>
  </p>
</div>

