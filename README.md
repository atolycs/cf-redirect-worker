# Subdomain Redirect Web worker

Referenced code: https://developers.cloudflare.com/workers/examples/bulk-redirects/

Redirect subdomains set in redirectMap to any location of your choice.

```
		const redirectMap = new Map([
			["dotfiles", "https://github.com/atolycs/dotfiles"],
			["setup", "https://github.com/atolycs/setup-tools"]
		])
```

