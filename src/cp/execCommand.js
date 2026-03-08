import { spawn } from "node:child_process";

const execCommand = () => {
	const argv = process.argv;
	const args = argv.slice(2);

	if (args.length === 0) {
		console.error("No command provided");
		process.exit(1);
	}

	const cmd = args[0];
	const cmdArgs = args.slice(1);

	const subprocess = spawn(cmd, cmdArgs, {
		stdio: "inherit",
		env: process.env,
		shell: true,
	});

	subprocess.on("error", (err) => {
		console.error(`Failed to start child process: ${err}`);
		process.exit(1);
	});

	subprocess.on("close", (code) => {
		process.exit(code);
	});
};

execCommand();
