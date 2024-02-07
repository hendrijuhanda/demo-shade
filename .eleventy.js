const postcss = require("postcss");
const postcssImport = require("postcss-import");
const postcssMediaMinmax = require("postcss-media-minmax");
const autoprefixer = require("autoprefixer");
const postcssCsso = require("postcss-csso");
const esbuild = require("esbuild");

module.exports = (config) => {
	// Passthru copy
	config.addPassthroughCopy("./src/css");
	config.addPassthroughCopy("./src/js");
	config.addPassthroughCopy("./src/font");
	config.addPassthroughCopy("./src/img");

	// Bundle CSS
	config.addTemplateFormats("css");

	config.addExtension("css", {
		outputFileExtension: "css",
		compile: async (content, path) => {
			if (path !== "./src/css/main.css") {
				return;
			}

			return async () => {
				let output = await postcss([
					postcssImport,
					postcssMediaMinmax,
					autoprefixer,
					postcssCsso,
				]).process(content, {
					from: path,
				});

				return output.css;
			};
		},
	});

	// Bundle JS
	config.addTemplateFormats("js");

	config.addExtension("js", {
		outputFileExtension: "js",
		compile: async (_content, path) => {
			if (path !== "./src/js/main.js") {
				return;
			}

			return async () => {
				let output = await esbuild.build({
					target: "es2020",
					entryPoints: [path],
					minify: true,
					bundle: true,
					write: false,
				});

				return output.outputFiles[0].text;
			};
		},
	});

	// Server options
	config.setServerOptions({
		port: 3000,
	});

	return {
		dir: {
			input: "src",
		},
		templateFormats: ["hbs", "ico"],
		passthroughFileCopy: true,
	};
};
