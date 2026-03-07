import { readdir } from "node:fs/promises";
import path from "node:path";

const findByExt = async () => {
	// Write your code here
	// Recursively find all files with specific extension
	// Parse --ext CLI argument (default: .txt)
	const args = process.argv.slice(2);
	const i = args.indexOf("--ext");
	const ext = i !== -1 ? args[i + 1] : ".txt";

	const currDir = process.cwd();

	const findFiles = async (dir) => {
		const entries = await readdir(dir, { withFileTypes: true });

		for (const entry of entries) {
			const fullPath = path.join(dir, entry.name);

			if (entry.isDirectory()) {
				await findFiles(fullPath);
			}

			if (entry.isFile() && entry.name.endsWith(ext)) {
				console.log(fullPath);
			}
		}
	};

	await findFiles(currDir);
};

await findByExt();
