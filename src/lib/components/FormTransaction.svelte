<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  import Select from "svelte-select";
  import type { IRequestTransaction, ITransaction } from "$lib/types.js";
  import {
    addTransaction,
    updateTransaction,
  } from "$lib/services/transactions.js";
  import { transactions } from "$lib/store.js";
  import moment from "moment";
  import { dateToUtc } from "$lib/converter.js";

  const dispatch = createEventDispatcher();
  export let description: string = "";
  export let nominal: number = 0;
  export let category: string = "";
  export let status: string = "";
  export let id: string | undefined = undefined;
  export let createdAt: string = moment().format("YYYY-MM-DD HH:mm");

  const categories = [
    "Meal",
    "Transport",
    "Selfcare",
    "Subscription",
    "E-Commerce",
    "Daily Needs",
    "Entertainment",
    "Other",
  ].map((i) => ({ value: i, label: i }));

  function setStatus(value: "income" | "expense"): void {
    status = value;
  }

  function onClose() {
    dispatch("close");
  }

  async function submitOnUpdate(id: string) {
    const data: Partial<ITransaction> = {
      category,
      description,
      nominal,
      status,
      createdAt: dateToUtc(createdAt),
    };
    const result = await updateTransaction(id, data);
    transactions.update(async (values) => {
      const current = await values;
      const updated = current.filter((f) => f.id !== result.id);
      return Promise.resolve(updated.concat(result));
    });
  }

  async function submit() {
    const data: IRequestTransaction = {
      category,
      description,
      nominal,
      status,
    };
    if (id) return submitOnUpdate(id);
    const result = await addTransaction(data);
    transactions.update(async (values) => {
      const current = await values;
      return Promise.resolve(current.concat(result));
    });
    onClose();
  }
</script>

<div
  class="fixed right-0 left-0 bottom-0 z-10 bg-gray-600 rounded-t-2xl bg p-5"
  transition:slide
>
  <div class="flex items-center justify-between mb-5">
    <h1 class="text-base font-bold">New Transaction</h1>
    <button on:click={onClose}>
      <iconify-icon icon="typcn:times" width="1.5rem" />
    </button>
  </div>
  <form class="flex flex-col gap-4" on:submit|preventDefault={submit}>
    <input
      type="text"
      placeholder="Description"
      class="input"
      required
      bind:value={description}
    />
    <input
      type="number"
      placeholder="Nominal"
      class="input"
      required
      bind:value={nominal}
    />
    <Select
      required={true}
      searchable={true}
      value={category}
      bind:justValue={category}
      class="!w-full !bg-gray-900 !rounded !p-3 !duration-200 !border !border-transparent !focus:border-green-500"
      items={categories}
    />
    <input
      type="datetime-local"
      placeholder="Date"
      class="input"
      required
      bind:value={createdAt}
    />
    <div class="grid grid-cols-2 gap-x-2">
      <button
        class:bordergreen={status === "income"}
        on:click={() => setStatus("income")}
        class="btn-status"
        type="button"
      >
        <iconify-icon icon="gg:arrow-up-o" class="text-green-500 text-lg" />
        <h1>Income</h1>
      </button>
      <button
        class:borderred={status === "expense"}
        on:click={() => setStatus("expense")}
        class="btn-status"
        type="button"
      >
        <iconify-icon icon="gg:arrow-down-o" class="text-red-500 text-lg" />
        <h1>Expense</h1>
      </button>
    </div>
    <button class="btn !py-3 font-bold text-base mt-5">Save</button>
  </form>
</div>

<style lang="scss">
  .bg::before {
    content: "";
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
  }

  .btn-status {
    @apply flex items-center gap-2 justify-center bg-gray-700/60 py-2.5 rounded border border-transparent duration-200 hover:bg-gray-700/40 active:bg-gray-700;
  }

  .bordergreen {
    @apply border-green-500;
  }
  .borderred {
    @apply border-red-500;
  }

  .input {
    @apply w-full bg-gray-900 rounded p-3 duration-200 border border-transparent focus:border-green-500;
  }
</style>
