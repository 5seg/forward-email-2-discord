import { parseXLoginAlert } from "./src/parser";

const content = `[https://ea.twimg.com/email/self_serve/media/spacer-1402696023930.png]

 [https://ton.twitter.com/twitter_blue_for_business/verified-programs/x_logo.png]
[https://twitter.com/scribe/ibis?t=1&cn=bG9naW5fbm90aWZpY2F0aW9uX2VtYWls&iid=487bf1a5965f46a98ca6b43f44d7830c&uid=2005244642753990656&nid=296+20]

We noticed a login to your account @gwj_7
[https://t.co/redirect?url=https%3A%2F%2Fx.com%2Fgwj_7&t=1&cn=bG9naW5fbm90aWZpY2F0aW9uX2VtYWls&sig=a2d23201c69590d76ba61a99d91fd833d3ba247c&iid=487bf1a5965f46a98ca6b43f44d7830c&uid=2005244642753990656&nid=296+1]
from a new device. Was this you? New login

Location* 東京 新宿区, 日本 Device SafariMobileIos on iPhone

*Location is approximate based on the login's IP address. If this was you You can ignore this message. There's no need to take any
action. If this wasn’t you Complete these steps now to protect your account.
 * Change your password.
   [https://twitter.com/i/redirect?url=https%3A%2F%2Ftwitter.com%2Faccount%2Fconfirm_email_reset%3Freset_type%3De%26amp%3Bpassword_reset_cause%3Dlogin_notification%26amp%3Buser_id%3D2005244642753990656%26amp%3Btoken%3DiFPyQy3lnXK0bNBq7WdO5N5Glvlof4UfKeF_swjwGRE%253D-1766925347978%26amp%3Btoken_version%3D0%26amp%3Bconfirm_pending_email%3D0&t=1&cn=bG9naW5fbm90aWZpY2F0aW9uX2VtYWls&sig=8cc1af8607e9eeed9bbb1a96676fd8ff9c050f95&iid=487bf1a5965f46a98ca6b43f44d7830c&uid=2005244642753990656&nid=296+4]
   You'll be logged out of all your active X sessions except the one you're using at this time.
 * Review the apps
   [https://t.co/redirect?url=https%3A%2F%2Fx.com%2Fsettings%2Fapplications&t=1&cn=bG9naW5fbm90aWZpY2F0aW9uX2VtYWls&sig=df03c2b183e528eddcefe91a84ec1f78f8296f4e&iid=487bf1a5965f46a98ca6b43f44d7830c&uid=2005244642753990656&nid=296+3]
   that have access to your account and revoke access to any unfamiliar apps. Learn more
   [https://help.x.com/managing-your-account/connect-or-revoke-access-to-third-party-apps].

Help [https://support.twitter.com/articles/76036] | Email security tips
[https://t.co/redirect?url=https%3A%2F%2Fsupport.x.com%2Farticles%2F204820-fake-twitter-emails&t=1&cn=bG9naW5fbm90aWZpY2F0aW9uX2VtYWls&sig=e525407d31148a79d5a89ee8a23ffede218644d1&iid=487bf1a5965f46a98ca6b43f44d7830c&uid=2005244642753990656&nid=296+6]
We sent this email to @gwj_7 X Corp. 1355 Market Street, Suite 900 San Francisco, CA 94103`;

const result = parseXLoginAlert(content);
console.log(result);
