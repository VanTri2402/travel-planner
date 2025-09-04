"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { auth } from "@/auth";

export async function createTrip(formData: FormData) {
  const session = await auth();
  if (!session || !session.user?.id) {
    throw new Error("Not authenticated.");
  }

  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const startDateStr = formData.get("startDate")?.toString();
  const endDateStr = formData.get("endDate")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  if (!title || !description || !startDateStr || !endDateStr || !imageUrl) {
    throw new Error("All fields is required.");
  }

  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  await prisma.trip.create({
    data: {
      title,
      description,
      imageUrl,
      endDate,
      startDate,
      userId: session.user.id,
    },
  });

  redirect("/trips");
}
