import { SmtpClient } from "npm:smtp-client@0.3.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SMTP_HOST = "smtpout.secureserver.net";
const SMTP_PORT = 465;
const SMTP_USER = "info@fencingplushk.com";
const SMTP_PASS = "Fencing1234@";
const FROM_ADDR = "info@fencingplushk.com";
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

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const data: ContactPayload = await req.json();

    const subject = buildSubject(data.source ?? "contact");
    const textBody = buildBody(data);

    const message = [
      `From: ${FROM_ADDR}`,
      `To: ${TO_ADDR}`,
      `Subject: ${subject}`,
      "Content-Type: text/plain; charset=utf-8",
      "",
      textBody,
    ].join("\r\n");

    const client = new SmtpClient({
      host: SMTP_HOST,
      port: SMTP_PORT,
      ssl: true,
    });

    await new Promise<void>((resolve, reject) => {
      client.on("error", (err: Error) => reject(err));
      client.connect(() => {
        client.login(
          SMTP_USER,
          SMTP_PASS,
          (err: Error | null) => {
            if (err) return reject(err);
            client.send(
              `MAIL FROM:<${FROM_ADDR}>`,
              (err: Error | null) => {
                if (err) return reject(err);
                client.send(
                  `RCPT TO:<${TO_ADDR}>`,
                  (err: Error | null) => {
                    if (err) return reject(err);
                    client.send("DATA", (err: Error | null) => {
                      if (err) return reject(err);
                      client.send(`${message}\r\n.`, (err: Error | null) => {
                        if (err) return reject(err);
                        client.send("QUIT", () => resolve());
                      });
                    });
                  },
                );
              },
            );
          },
        );
      });
    });

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
