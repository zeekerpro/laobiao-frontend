<script>
  import Signin from "@views/authentication/Signin.svelte";
</script>

<svelte:head>
  <title>Signin</title>
</svelte:head>


<Signin />

<div class="bg-gray-100 p-5">
  <p class="text-sm text-gray-500 font-light text-center">
    Don't have an account?
    <a class="text-primary font-medium" href="/signup"> Sign up </a>
  </p>
</div>

