<script lang="ts">
  import { currencyNumber, utcToDate } from "$lib/converter.js";
  import { getAllTransactions } from "$lib/services/transactions.js";
  import { transactions } from "$lib/store.js";
  import type { ITransaction } from "$lib/types.js";

  let isMouseDown = false;
  let startX: number;
  let scrollLeft: number;
  let slider: HTMLElement;
  let items: ITransaction[] = [];
  let expenseItems: ITransaction[] = [];
  let incomeItems: ITransaction[] = [];

  function compareUTCStringsDesc(a: ITransaction, b: ITransaction) {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    // Use the built-in Date comparison to sort in descending order
    // @ts-ignore
    return dateB - dateA;
  }

  function startDragging(e: MouseEvent) {
    isMouseDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  }

  function stopDragging() {
    isMouseDown = false;
  }

  function onMouseMove(e: MouseEvent) {
    if (!isMouseDown) return;
    const x = e.pageX - slider.offsetLeft;
    const scroll = x - startX;
    slider.scrollLeft = scrollLeft - scroll;
  }

  function getReduceTransaction(items: ITransaction[]) {
    const values = items.reduce((a, b) => a + b.nominal, 0);
    return values;
  }

  $: {
    $transactions;
    setTimeout(() => {
      getAllTransactions()
        .then((data) => {
          items = data.sort(compareUTCStringsDesc);
          incomeItems = data
            .filter((f) => f.status === "income")
            .sort(compareUTCStringsDesc);
          expenseItems = data
            .filter((f) => f.status === "expense")
            .sort(compareUTCStringsDesc);
        })
        .catch((err) => console.error(err));
    }, 500);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={slider}
  on:mousemove|preventDefault={onMouseMove}
  on:mousedown={startDragging}
  on:mouseup={stopDragging}
  on:mouseleave={stopDragging}
  class="overflow-auto snap-x px-5"
  class:grab={!isMouseDown}
  class:grabbing={isMouseDown}
>
  <div class="flex items-center gap-x-5 min-w-[calc((80vw*3)+5rem)]">
    <div class="w-[80vw] snap-center p-7 bg-gray-700 rounded-lg">
      <div class="flex items-center mb-7">
        <h1 class="flex-grow text-gray-300 text-base font-semibold">Income</h1>
        <iconify-icon
          icon="gg:arrow-up-o"
          width="1.75rem"
          class="text-green-500"
        />
      </div>
      <h1 class="font-bold text-2xl text-gray-200 mb-1.5">
        {currencyNumber(getReduceTransaction(incomeItems))}
      </h1>
      <h2 class="text-gray-400">
        Latest transaction at {utcToDate(
          incomeItems[0]?.createdAt,
          "DD MMM 'YY"
        )}
      </h2>
    </div>
    <div class="w-[80vw] snap-center p-7 bg-gray-700 rounded-lg">
      <div class="flex items-center mb-7">
        <h1 class="flex-grow text-gray-300 text-base font-semibold">Expense</h1>
        <iconify-icon
          icon="gg:arrow-down-o"
          width="1.75rem"
          class="text-red-500"
        />
      </div>
      <h1 class="font-bold text-2xl text-gray-200 mb-1.5">
        {currencyNumber(getReduceTransaction(expenseItems))}
      </h1>
      <h2 class="text-gray-400">
        Latest transaction at {utcToDate(
          expenseItems[0]?.createdAt,
          "DD MMM 'YY"
        )}
      </h2>
    </div>
    <div class="w-[80vw] snap-center p-7 bg-green-700 rounded-lg">
      <div class="flex items-center mb-7">
        <h1 class="flex-grow text-gray-300 text-base font-semibold">Total</h1>
        <iconify-icon
          icon="solar:dollar-linear"
          width="1.75rem"
          class="text-gray-100"
        />
      </div>
      <h1 class="font-bold text-2xl text-gray-200 mb-1.5">
        {currencyNumber(
          getReduceTransaction(incomeItems) - getReduceTransaction(expenseItems)
        )}
      </h1>
      <h2 class="text-gray-400">
        Latest transaction at {utcToDate(items[0]?.createdAt, "DD MMM 'YY")}
      </h2>
    </div>
  </div>
</div>

<style lang="scss">
  .grab {
    @apply cursor-grab;
  }
  .grabbing {
    @apply cursor-grabbing;
  }
</style>
