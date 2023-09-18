<script lang="ts">
  import { currencyNumber, utcToDate } from "$lib/converter.js";
  import { removeTransaction } from "$lib/services/transactions.js";
  import { transactions } from "$lib/store.js";
  import type { ITransaction } from "$lib/types.js";
  import moment from "moment";
  import FormTransaction from "./FormTransaction.svelte";

  export let item: ITransaction;
  let isEdit: boolean = false;
  function toggle() {
    isEdit = !isEdit;
  }

  async function deleteTransaction() {
    const isConfirm = confirm("Are you sure?");
    if (!isConfirm) return;
    const { id } = item;
    const result = await removeTransaction(id);
    transactions.update(async (values) => {
      const current = await values;
      return current.filter((f) => f.id !== result.id);
    });
  }
</script>

<div class="rounded-lg bg-gray-700 p-5">
  <div class="flex mb-2 items-center gap-2">
    <h1 class="flex-grow">{item.description}</h1>
    <button
      class="text-lg text-gray-200 duration-200 hover:text-gray-300 active:text-gray-200"
      on:click={toggle}
      title="Edit transaction"
      ><iconify-icon icon="uil:edit" class="text-lg" /></button
    >
    <button
      on:click={deleteTransaction}
      title="Remove transaction"
      class="text-lg text-red-500 duration-200 hover:text-red-600 active:text-red-500"
      ><iconify-icon icon="clarity:trash-solid" /></button
    >
  </div>
  <h1
    class="font-bold text-lg mb-4"
    class:textgreen={item.status === "income"}
    class:textred={item.status === "expense"}
  >
    {currencyNumber(item.nominal)}
  </h1>
  <div class="flex gap-1 items-center text-gray-400">
    <iconify-icon icon="mdi:label-outline" class="text-lg" />
    <h1 class="flex-grow">{item.category}</h1>
    <iconify-icon icon="formkit:date" />
    <h1>{utcToDate(item.createdAt, "YYYY/MM/DD / HH:mm")}</h1>
  </div>
</div>

{#if isEdit}
  <FormTransaction
    {...item}
    createdAt={utcToDate(item.createdAt, "YYYY-MM-DD HH:mm")}
    on:close={toggle}
  />
{/if}

<style lang="scss">
  .textgreen {
    @apply text-green-500;
  }

  .textred {
    @apply text-red-500;
  }
</style>
