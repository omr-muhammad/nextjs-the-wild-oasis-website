"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  const nationalID = formData.get("nationalID");

  if (!/^[a-z0-9]{6,20}$/i.test(nationalID))
    throw new Error("Please use a valid national ID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updatedData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) {
    console.log("ID ID ID", session.user.guestId);
    throw new Error("Guest could not be updated");
  }

  // REVALIDATING THE DATA AFTER UPDATING
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId, guestId) {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  if (guestId !== session.user.guestId)
    throw new Error("You can only delete your own reservations");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}
