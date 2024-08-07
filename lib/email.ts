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
}: {
  to: string;
  from: string;
  subject: string;
  html: any;
}) {
  const emailData = {
    Messages: [
      {
        From: {
          Email: from,
          Name: "Blériot Noguia",
        },
        To: [
          {
            Email: to,
            Name: "Recipient Name",
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
    // alert('Email sent successfully!');
    console.log("Email sent successfully!");
    return result;
  } catch (error) {
    // alert('Error sending email');
    console.error("Error sending email:", error);
    throw error;
  }
}
