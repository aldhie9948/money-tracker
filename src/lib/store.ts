import { writable } from "svelte/store";
import type { ITransaction } from "./types.js";

export const transactions = writable<Promise<ITransaction[]>>(
  Promise.resolve([])
);
