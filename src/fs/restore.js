import { readFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const restore = async () => {
	// Write your code here
	// Read snapshot.json
	// Treat snapshot.rootPath as metadata only
	// Recreate directory/file structure in workspace_restored
	try {
		const raw = await readFile("snapshot.json", "utf8");
		const snapshot = JSON.parse(raw);

		const outputRoot = path.resolve("workspace_restored");

		await mkdir(outputRoot, { recursive: true });

		for (const entry of snapshot.entries) {
			const relativePath = entry.path || entry.relativePath || entry.name;
			const entryType = entry.type || entry.kind;

			if (!relativePath) {
				continue;
			}

			const targetPath = path.join(outputRoot, relativePath);

			if (entryType === "directory" || entry.isDirectory === true) {
				await mkdir(targetPath, { recursive: true });
			} else if (entryType === "file" || entry.isFile === true) {
				const parentDir = path.dirname(targetPath);

				await mkdir(parentDir, { recursive: true });
				await writeFile(targetPath, "");
			}
		}

	} catch (err) {
		console.error("Restore failed:", err.message);
		process.exit(1);
	}
};

await restore();
