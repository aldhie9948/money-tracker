import type { IRequestTransaction, ITransaction } from "$lib/types.js";
import axios from "axios";
const BASE_URL = "/api/transactions";

function errorHandler(error: unknown) {
  let message = "";
  if (error instanceof Error) {
    console.log(error.message);
    message = error.message;
  }
  return Promise.reject(message);
}

export async function getAllTransactions() {
  try {
    const { data } = await (<Promise<{ data: ITransaction[] }>>(
      axios.get(BASE_URL)
    ));
    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function addTransaction(data: IRequestTransaction) {
  try {
    const { data: result } = await (<Promise<{ data: ITransaction }>>(
      axios.post(BASE_URL, data)
    ));
    return result;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function removeTransaction(id: string) {
  try {
    const { data } = await (<Promise<{ data: ITransaction }>>(
      axios.delete(BASE_URL + "/" + id)
    ));
    return data;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function updateTransaction(
  id: string,
  data: Partial<ITransaction>
) {
  try {
    const { data: result } = await (<Promise<{ data: ITransaction }>>(
      axios.put(BASE_URL + "/" + id, data)
    ));
    return result;
  } catch (error) {
    return errorHandler(error);
  }
}

export async function searchTransaction(search: string) {
  try {
    const { data } = await (<Promise<{ data: ITransaction[] }>>(
      axios.post(BASE_URL + "/search", { search })
    ));
    return data;
  } catch (error) {
    return errorHandler(error);
  }
}
