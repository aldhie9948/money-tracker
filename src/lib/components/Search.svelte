<script lang="ts">
  import {
    getAllTransactions,
    searchTransaction,
  } from "$lib/services/transactions.js";
  import { transactions } from "$lib/store.js";

  let search: string;

  async function submit() {
    if (search === "") $transactions = getAllTransactions();
    $transactions = searchTransaction(search);
  }
</script>

<div class="px-5 mt-5">
  <div class="flex justify-between mb-2">
    <h1 class="text-base text-gray-300">Transactions</h1>
    <h1 class="text-gray-400">5 items</h1>
  </div>
  <form on:submit|preventDefault={submit}>
    <div class="grid grid-cols-5 gap-2 items-center">
      <input
        bind:value={search}
        type="search"
        class="bg-gray-900 flex-grow h-full col-span-4 px-5 rounded"
        placeholder="Search transaction"
      />
      <button class="p-2 pt-2.5 border btn-outline rounded">
        <iconify-icon icon="material-symbols:search" width="1.5rem" />
      </button>
    </div>
  </form>
</div>
