/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.toml`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */


export default {
	async fetch(request: Request): Promise<Response> {
		const error_data = {
			"status": "error"
		}
		const redirectMap = new Map([
			["dotfiles", "https://github.com/atolycs/dotfiles"],
			["setup", "https://github.com/atolycs/setup-tools"]
		])

		const subRedirect = request.url.split(".")[0].replace("https://", "")
		const url = new URL(request.url)
		let _os

		const searchParams = url.searchParams;
		for ( const [key, value] of searchParams) {
			_os = value
		}

		const location = redirectMap.get(subRedirect) + `/raw/${_os}/install.bash`

		if (location) {
			return Response.redirect(location, 301);
		}

		return Response.json(error_data)
	},
} satisfies ExportedHandler;
