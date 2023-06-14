<script lang="ts">
  import TabsContainer from "$components/layout/TabsContainer.svelte";
  import { guard } from "$utils/client/routeMonitor";
  import { beforeNavigate } from "$app/navigation";

  beforeNavigate(guard)

</script>

<TabsContainer>
  <slot></slot>
</TabsContainer>
