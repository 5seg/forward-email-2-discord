//@ts-ignore
import { EmailMessage } from "cloudflare:email"; //TYPESCRIPT SAYS cloudflare:email IS NOT DEFINED. WHY??????
import TurndownService from "turndown";
import { createMimeMessage } from "mimetext";
import PostalMime from "postal-mime";
import { extractDiscordVerifyLink } from "./extracter";
import { convert } from "html-to-text";

interface ForwardableEmailMessage {
  readonly from: string;
  readonly to: string;
  readonly headers: Headers;
  readonly raw: ReadableStream;
  readonly rawSize: number;

  constructor(from: string, to: string, raw: ReadableStream | string): any;

  setReject(reason: string): void;
  forward(rcptTo: string, headers?: Headers): Promise<void>;
  reply(message: EmailMessage): Promise<void>;
}

export default {
  async email(message: ForwardableEmailMessage, env: any, context: any) {
    const converter = new TurndownService();
    const Noisy_Titles = ["あなたに言及しました"];

    const email = await new PostalMime().parse(message.raw);

    for (const title of Noisy_Titles) {
      if (email.subject!.endsWith(title)) {
        const msg = createMimeMessage();
        msg.setHeader("In-Reply-To", message.headers.get("Message-ID")!);
        msg.setSender({
          name: "Please don't send email to me.",
          addr: message.to,
        });
        msg.setRecipient(message.from);
        msg.setSubject("Please don't send email to me.");
        msg.addMessage({
          contentType: "text/plain",
          data: "Fuck you",
        });

        const replyMessage = new EmailMessage(
          message.to,
          message.from,
          msg.asRaw(),
        );

        await message.reply(replyMessage);
        return;
      }
    }

    const content: string | undefined = email.html
      ? //@ts-ignore
        convert(email.html)
      : email.text;
    console.log(`content: ` + content);

    if (email.from?.address === "noreply@discord.com") {
      if (email.subject!.endsWith("メールアドレスを確認してください")) {
        const verifyLink = extractDiscordVerifyLink(content ?? "");
        if (verifyLink) {
          await fetch(env.WEBHOOK_URL, {
            method: "POST",
            body: JSON.stringify({
              username: message.to.toLowerCase(),
              content: `メールアドレスを確認してください`,
              embeds: [
                {
                  title: "認証リンク",
                  url: verifyLink,
                  color: "green",
                },
              ],
            }),
          });
        }
      }
    }

    const formData = new FormData();

    formData.append(
      "payload_json",
      JSON.stringify({
        username: message.to.toLowerCase().replaceAll("discord", "dis#ord"),
        content: `\`from: ${email.from!.name} (${email.from!.address})\`
${email.subject || "件名なし"}

<t:${Date.parse(email.date!) / 1000}:R>`,
        allowed_mentions: {
          parse: [],
        },
      }),
    );

    if (content !== undefined) {
      formData.append(
        "file1",
        new Blob([content], { type: "text/plain" }),
        "body.txt",
      );
    }

    email.attachments.forEach((attachment, index) =>
      formData.append(
        "file" + (index + 1),
        new Blob([attachment.content], { type: attachment.mimeType }),
        attachment.filename!,
      ),
    );

    context.waitUntil(
      (async () => {
        const res = await fetch(env.WEBHOOK_URL, {
          method: "POST",
          headers: {
            Accept: "*/*",
          },
          body: formData,
        });

        console.log(res.status);
        console.log(await res.text());
      })(),
    );
  },
  //@ts-ignore STFU
} satisfies ExportedHandler;
