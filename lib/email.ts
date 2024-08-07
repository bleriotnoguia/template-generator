"use server";

import mailjet from "node-mailjet";

const mailjetClient = mailjet.apiConnect(
  process.env.MAILJET_API_PUBLIC_KEY ?? "6c5a769efc45d799d13a22a3f22a1506",
  process.env.MAILJET_API_PRIVATE_KEY ?? "28e72cdd08c7bd24186cdbf7a2fb8a02"
);

export async function sendEmail({
  to,
  from,
  subject,
  html,
  toName,
}: {
  to: string;
  from: string;
  subject: string;
  html: any;
  toName?: string;
}) {
  const emailData = {
    Messages: [
      {
        From: {
          Email: from,
          Name: "Email Template Generator",
        },
        To: [
          {
            Email: to,
            Name: toName ?? "Recipient Name",
          },
        ],
        Subject: subject,
        HtmlPart: html,
      },
    ],
  };

  try {
    const result = await mailjetClient
      .post("send", { version: "v3.1" })
      .request(emailData);
    return {
      status: "success",
      data: result.body,
      message: "Email sent successfully",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      status: "error",
      message: "Error sending email",
    };
  }
}
