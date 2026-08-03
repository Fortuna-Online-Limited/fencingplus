import { connect } from "node:tls";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP_HOST = "smtpout.secureserver.net";
const SMTP_PORT = 465;
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

function encodeAuth(user: string, pass: string): string {
  const raw = `${user}\0${user}\0${pass}`;
  const bytes = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);
  return btoa(String.fromCharCode(...bytes));
}

function sendCommand(socket: any, cmd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let response = "";
    const onData = (chunk: Buffer) => {
      response += chunk.toString();
      if (response.includes("\r\n")) {
        socket.off("data", onData);
        resolve(response.trim());
      }
    };
    socket.on("data", onData);
    socket.on("error", (err: Error) => {
      socket.off("data", onData);
      reject(err);
    });
    socket.write(cmd + "\r\n");
  });
}

async function sendEmail(data: ContactPayload): Promise<void> {
  const subject = buildSubject(data.source ?? "contact");
  const textBody = buildBody(data);

  const message = [
    `From: ${FROM_ADDR}`,
    `To: ${TO_ADDR}`,
    `Subject: ${subject}`,
    "Content-Type: text/plain; charset=utf-8",
    "MIME-Version: 1.0",
    "",
    textBody,
  ].join("\r\n");

  const socket = await new Promise<any>((resolve, reject) => {
    const s = connect(SMTP_PORT, SMTP_HOST, { rejectUnauthorized: false }, () => resolve(s));
    s.on("error", reject);
  });

  try {
    await new Promise<void>((resolve) => {
      socket.once("data", () => resolve());
    });

    await sendCommand(socket, "EHLO fencingplushk.com");
    await sendCommand(socket, "AUTH LOGIN");
    await sendCommand(socket, btoa(SMTP_USER));
    await sendCommand(socket, btoa(SMTP_PASS));
    await sendCommand(socket, `MAIL FROM:<${FROM_ADDR}>`);
    await sendCommand(socket, `RCPT TO:<${TO_ADDR}>`);
    await sendCommand(socket, "DATA");
    await sendCommand(socket, `${message}\r\n.`);
    await sendCommand(socket, "QUIT");
  } finally {
    socket.destroy();
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data: ContactPayload = await req.json();
    await sendEmail(data);
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
