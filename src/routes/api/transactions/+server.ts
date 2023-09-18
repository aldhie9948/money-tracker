import { prisma } from "$lib/server/prisma.js";
import { json, error } from "@sveltejs/kit";
import type { IRequestTransaction } from "$lib/types.js";
import { catcher } from "$lib/server/handler.js";

export async function GET() {
  try {
    const data = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
    return json(data);
  } catch (err) {
    throw catcher(err);
  }
}

export async function POST({ request }) {
  try {
    const data = await (<Promise<IRequestTransaction>>request.json());
    const added = await prisma.transaction.create({ data });
    return json(added);
  } catch (err) {
    throw catcher(err);
  }
}
