import { prisma } from "$lib/server/prisma.js";
import { catcher } from "$lib/server/handler.js";
import { json } from "@sveltejs/kit";

export async function POST({ request }) {
  try {
    const { search } = await (<Promise<{ search: string }>>request.json());
    const data = await prisma.transaction.findMany({
      where: {
        description: {
          contains: search,
          mode: "insensitive",
        },
      },
    });
    return json(data);
  } catch (err) {
    throw catcher(err);
  }
}
