import { prisma } from "$lib/server/prisma.js";
import { error, json } from "@sveltejs/kit";
import type { IRequestTransaction } from "$lib/types.js";
import { catcher } from "$lib/server/handler.js";

export async function GET({ params }) {
  try {
    const id = params.id;
    const data = await prisma.transaction.findFirst({ where: { id } });
    return json(data);
  } catch (err) {
    throw catcher(err);
  }
}

export async function PUT({ request, params }) {
  try {
    const id = params.id;
    const data = await (<Promise<Partial<IRequestTransaction>>>request.json());
    const updated = await prisma.transaction.update({
      data,
      where: { id },
    });
    return json(updated);
  } catch (err) {
    throw catcher(err);
  }
}

export async function DELETE({ params }) {
  try {
    const id = params.id;
    const deleted = await prisma.transaction.delete({
      where: {
        id,
      },
    });
    return json(deleted);
  } catch (err) {
    throw catcher(err);
  }
}
