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


type error_response = {
	status: boolean,
	message: string
}

export default {
	//@ts-ignore
	async fetch(request: Request): Promise<Response> {
		const error_data: error_response = {
			status: false,
			message: "Invalid request"
		}
		const redirectMap = new Map([
			["dotfiles", "https://github.com/atolycs/dotfiles"],
			["setup", "https://github.com/atolycs/setup-tools"]
		])

		const os_list = new Map([
			["linux", "linux/install.bash"],
			["win", "win/install.ps1"]
		])

		const subRedirect = request.url.split(".")[0].replace("https://", "")
		const parsed_os = os_list.get(request.url.replace("https://", "").split("/")[1]);

		console.log(parsed_os)

		let location

		if (parsed_os != undefined ) {
			location = redirectMap.get(subRedirect) + `/raw/main/${parsed_os}`
		} else {
			return Response.json(error_data, { status: 503 })
		}

		if (location) {
			return Response.redirect(location, 301);
		}

	},
} satisfies ExportedHandler;
