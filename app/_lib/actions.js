"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { redirect } from "next/navigation";

async function checkExistingUser() {
  const session = await auth();

  if (!session) throw new Error("You must be logged in");

  return session;
}

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuestProfile(formData) {
  const session = await checkExistingUser();

  const nationalID = formData.get("nationalID");

  if (!/^[a-z0-9]{6,20}$/i.test(nationalID))
    throw new Error("Please use a valid national ID");

  const [nationality, countryFlag] = formData.get("nationality").split("%");

  const updatedData = { nationalID, nationality, countryFlag };

  const { error } = await supabase
    .from("guests")
    .update(updatedData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");

  // REVALIDATING THE DATA AFTER UPDATING
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId, guestId) {
  const session = await checkExistingUser();

  if (Number(guestId) !== Number(session.user.guestId))
    throw new Error("You can only delete your own reservations");

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be deleted");

  revalidatePath("/account/reservations");
}

export async function updateReservation(formData) {
  const session = await checkExistingUser();

  if (Number(session.user.guestId) !== Number(formData.get("guestId")))
    throw new Error("You can only edit your reservations");

  const bookingId = formData.get("bookingId");

  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations").slice(0, 1000) || "",
  };

  const { error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId);

  if (error) throw new Error("Booking could not be updated");

  revalidatePath("/account/reservations");
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  redirect("/account/reservations", "replace");
}
