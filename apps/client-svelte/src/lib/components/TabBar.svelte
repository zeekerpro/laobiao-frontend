<script lang="ts">

let tabs = [
  {
    id: "home",
    icon: "home",
    label: "home",
    path: "/",
    active: true
  },
  {
    id: "chat",
    icon: "chat",
    label: "chat",
    path: "/chat",
    active: false
  },
  {
    id: "me",
    icon: "user",
    label: "profile",
    path: "/profile",
    active: false
  }
]

</script>

<footer class=" fixed bottom-0 w-full ">

  <ul class="flex justify-between items-center menu menu-horizontal bg-base-200 rounded-box bg-white border-t border-gray-200 ">
    {#each tabs as tab}
    <li>
      <a class="tooltip flex flex-col justify-center" data-tip={tab.label} href={tab.path} >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
        <span>{tab.label}</span>
      </a>
    </li>
    {/each}
  </ul>

</footer>
