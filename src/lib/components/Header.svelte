<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function onClick() {
    dispatch("add");
  }
</script>

<div class="flex gap-2 items-center p-5">
  <iconify-icon
    icon="vaadin:coin-piles"
    width="1.5rem"
    class="text-green-500"
  />
  <h1 class="font-bold flex-grow">Money Tracker</h1>
  <button on:click={onClick} class="btn">New Transaction</button>
</div>
