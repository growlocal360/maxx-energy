import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email/contact-notification";

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const supabase = await createClient();

  const body = await request.json();

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim() || null;
  const company = String(body.company ?? "").trim() || null;
  const message = String(body.message ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  // No .select() here: the anon role can insert but cannot read this table,
  // and Postgres rejects INSERT ... RETURNING when the SELECT policy fails.
  const { error } = await supabase.from("contact_submissions").insert({
    name,
    email,
    phone,
    company,
    message,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // The submission is saved; a mail failure is logged but not surfaced.
  const notification = await sendContactNotification({
    name,
    email,
    phone,
    company,
    message,
  });

  return NextResponse.json({ success: true, emailSent: notification.sent });
}
