import { error } from "@sveltejs/kit";

export function catcher(err: unknown) {
  let message = "";
  if (err instanceof Error) {
    console.log(err.message);
    message = err.message;
  }
  return error(500, message);
}
