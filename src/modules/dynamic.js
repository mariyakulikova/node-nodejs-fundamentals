const dynamic = async () => {
	// Write your code here
	// Accept plugin name as CLI argument
	// Dynamically import plugin from plugins/ directory
	// Call run() function and print result
	// Handle missing plugin case
	const args = process.argv.slice(2);
	const pluginName = args[0];

	if (!pluginName) {
		console.log("Please provide plugin name");
		return;
	}

	try {
		const module = await import(
			new URL(`./plugins/${pluginName}.js`, import.meta.url)
		);

		if (typeof module.run !== "function") {
			console.log("Plugin does not export run()");
			return;
		}

		const result = await module.run();
		console.log(result);
	} catch (error) {
		console.log("Plugin not found");
	}
};

await dynamic();
