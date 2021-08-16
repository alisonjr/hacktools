import { createServer } from "http"
import { readFileSync } from "fs"
import path, { extname, join } from "path"

const ROOT_PATH = join(__dirname, "front")

const makePage = function (pageContent, apiUrl) {
	const templatePath = join(ROOT_PATH, "template.html")
	const templateContent = readFileSync(templatePath, "utf8")

	return templateContent.replace("{{content}}", pageContent).replace("{{API_URI}}", `'${apiUrl}'`)
}

const render = function (httpResponse, contentType, content) {
	httpResponse.writeHead(200, { "Content-Type": contentType })
	httpResponse.end(content, "utf-8")
}

const render404 = function (httpResponse) {
	let content404 = readFileSync(path.join(ROOT_PATH, "pages", "404.html"), "utf8")
	httpResponse.writeHead(200, { "Content-Type": "text/html" })
	httpResponse.end(content404, "utf-8")
}

const render500 = function (httpResponse) {
	httpResponse.writeHead(500)
	httpResponse.end("Desculpe! Estamos com problemas em nosso servidor...\n")
	httpResponse.end()
}

const staticServer = function (params) {
	return createServer(function (request, response) {

		const url = request.url.split("?")[0]

		let filePath = join(ROOT_PATH, "pages", url)

		if (url.includes("public/")) filePath = join(ROOT_PATH, url)

		if (extname(filePath) === "") filePath = join(filePath, "/index.html")

		const extension = extname(filePath)
		let contentType = "text/html"

		switch (extension) {
			case ".js":
				contentType = "text/javascript"
				break
			case ".css":
				contentType = "text/css"
				break
			case ".json":
				contentType = "application/json"
				break
			case ".png":
				contentType = "image/png"
				break
			case ".jpg":
				contentType = "image/jpg"
				break
			case ".wav":
				contentType = "audio/wav"
				break
			case ".ico":
				filePath = join(ROOT_PATH, "public", url)
				contentType = "image/x-icon"
				break
		}

		if (filePath.endsWith("/")) filePath = filePath.substr(filePath, filePath.length - 1)

		try {
			const fileContent = readFileSync(filePath, "utf8")

			if (contentType === "text/html") render(response, contentType, makePage(fileContent, params.API_URI))
			else render(response, contentType, fileContent)
		} catch (error) {
			if (error.code === "ENOENT") {
				try {
					render404(response)
				} catch (e) {
					render500(response)
				}
			} else {
				render500(response)
			}
		}
	})
}

export default staticServer
