<script>
</script>

<section class="sign-container flow-root">

  <div class="sm:mt-20">

    <section class="sign-logo flex items-center justify-center gap-2 my-6">
      <img src="/images/logo.png" class="h-16" alt="logo" />
      <span class=" logo-text
        text-3xl font-bold
        text-transparent bg-clip-text
        bg-gradient-to-r from-purple-500 via-emerald-500 to-sky-500
        italic
        ">
        LaoBiao ...
      </span>

    </section>

    <section class="
      rounded border-0
      w-full sm:max-w-md
      mt-6 mx-auto
      overflow-hidden
      "
      >
      <slot></slot>
    </section>

  </div>

</section>

<style>

.logo-text{
	background-size: 300% 300%;
	animation: gradient-x 2.5s ease-in-out infinite;
}

@keyframes gradient-x {
  0% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 0%;
  }
}
</style>

