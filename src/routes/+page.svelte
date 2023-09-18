<script lang="ts">
  import FormTransaction from "$lib/components/FormTransaction.svelte";
  import CardTransaction from "$lib/components/CardTransaction.svelte";
  import Header from "$lib/components/Header.svelte";
  import Hero from "$lib/components/Hero.svelte";
  import Search from "$lib/components/Search.svelte";
  import TransactionItem from "$lib/components/TransactionItem.svelte";
  import { getAllTransactions } from "$lib/services/transactions.js";
  import { transactions } from "$lib/store.js";
  import { onMount } from "svelte";
  import Loading from "$lib/components/Loading.svelte";

  let isFormShown: boolean = false;
  function toggle() {
    isFormShown = !isFormShown;
    if (isFormShown) document.body.style.overflow = "hidden";
    else if (!isFormShown) document.body.style.overflow = "auto";
  }

  onMount(() => {
    $transactions = getAllTransactions();
  });
</script>

<Header on:add={toggle} />
<Hero />
<CardTransaction />
<Search />
<div class="px-5 grid grid-cols-1 gap-2 my-5">
  {#await $transactions}
    <Loading />
  {:then items}
    {#each items as item, i (i)}
      <TransactionItem {item} />
    {/each}
  {:catch}
    <h1>There is no transactions</h1>
  {/await}
</div>

{#if isFormShown}
  <FormTransaction on:close={toggle} />
{/if}
