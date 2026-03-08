import readline from "readline";

const interactive = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	const prompt = () => {
		rl.question("> ", (input) => {
			const command = input.trim();

			switch (command) {
				case "uptime":
					console.log(process.uptime());
					break;

				case "cwd":
					console.log(process.cwd());
					break;

				case "date":
					console.log(new Date().toString());
					break;

				case "exit":
					rl.close();
					break;

				case "":
					break;

				default:
					console.log(`Unknown command: ${command}`);
					console.log("Available commands: uptime, cwd, date, exit");
			}

			if (command !== "exit") {
				prompt();
			}
		});
	};

	rl.on("SIGINT", () => rl.close());

	rl.on("close", () => console.log("\nGoodbye!"));

	console.log(
		"Welcome to Interactive CLI! Type a command (uptime, cwd, date, exit)",
	);
	prompt();
};

interactive();
