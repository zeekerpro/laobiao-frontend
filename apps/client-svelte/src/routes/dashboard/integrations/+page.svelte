<script>
import Icon from "@iconify/svelte"
  const menus = [
    {
      index: 1,
      label: "openai",
      path: "/dashboard/integrations/openai",
      icon: "ri:openai-fill"
    }
  ]

</script>

<ul class="mt-3 flex flex-col gap-1 bg-base-200 rounded-xl mx-3">
{#each menus as menu (menu.index)}
  <li class="list-none hover:bg-primary">
    <a href="{menu.path}"
      class="
      btn btn-ghost rounded-btn
      capitalize text-lg
      flex items-center justify-between
      "
      >
      <Icon icon="{menu.icon}" class="h-5 w-5" />
      <span class="grow text-left"> {menu.label} </span>
      <Icon icon="icon-park-outline:right" class="text-xl" />
    </a>
  </li>
{/each}
</ul>
