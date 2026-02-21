# Forward email to discord w/Cloudflare Email Workers

## Install and Usage

Clone this repository and add webhook url to `wrangler.jsonc`

```jsonc
"vars": {
  "WEBHOOK_URL": "https://discord.com/api/webhooks/1474633193578696745/5jR8AOBofuJElBT0yDY4GLcp1-RW0RRULqx1Db7y572dsDDd_WG7P8TSheh3GHYXwd-g",
},
```

After editing config, run `pnpm i && pnpm run deploy` to install deps and deploy.

Enjoy!
