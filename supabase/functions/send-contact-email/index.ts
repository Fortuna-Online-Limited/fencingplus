import nodemailer from "npm:nodemailer@6.9.14";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP_HOST = "smtp.office365.com";
const SMTP_PORT = 587;
const SMTP_USER = "info@fencingplushk.com";
const SMTP_PASS = "Fencing1234@";
const FROM_ADDR = "no-reply@fencingplushk.com";
const TO_ADDR = "info@fencingplushk.com";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  child_name?: string;
  course_interest?: string;
  message?: string;
  source?: string;
}

function buildSubject(source: string): string {
  return source === "facilities"
    ? "[Fencing Plus] New Enquiry from Facilities Page"
    : "[Fencing Plus] New Contact Form Submission";
}

function buildBody(data: ContactPayload): string {
  const lines: string[] = [];
  lines.push("You have received a new enquiry from the Fencing Plus website.");
  lines.push("");
  if (data.name) lines.push(`Name: ${data.name}`);
  if (data.email) lines.push(`Email: ${data.email}`);
  if (data.phone) lines.push(`Phone: ${data.phone}`);
  if (data.child_name) lines.push(`Student Age / Child Name: ${data.child_name}`);
  if (data.course_interest) lines.push(`Course Interest: ${data.course_interest}`);
  if (data.message) {
    lines.push("");
    lines.push("Message:");
    lines.push(data.message);
  }
  lines.push("");
  lines.push("---");
  lines.push("This message was sent automatically from the Fencing Plus website contact form.");
  return lines.join("\n");
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  requireTLS: true,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data: ContactPayload = await req.json();

    const subject = buildSubject(data.source ?? "contact");
    const textBody = buildBody(data);

    await transporter.sendMail({
      from: FROM_ADDR,
      to: TO_ADDR,
      subject,
      text: textBody,
    });

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : "Failed to send email";
    return new Response(
      JSON.stringify({ error: errMsg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
