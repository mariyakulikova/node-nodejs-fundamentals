import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const snapshot = async () => {
	// Write your code here
	// Recursively scan workspace directory
	// Write snapshot.json with:
	// - rootPath: absolute path to workspace
	// - entries: flat array of relative paths and metadata
	const workspacePath = path.resolve("workspace");
	const entries = [];

	const scanDir = async (currentDir) => {
		const dirEntries = await readdir(currentDir, { withFileTypes: true });

		for (const entry of dirEntries) {
			const fullPath = path.join(currentDir, entry.name);
			const relativePath = path.relative(workspacePath, fullPath);

			if (entry.isDirectory()) {
				entries.push({
					path: relativePath,
					type: "directory",
				});

				await scanDir(fullPath);
			} else if (entry.isFile()) {
				entries.push({
					path: relativePath,
					type: "file",
				});
			}
		}
	};

	await scanDir(workspacePath);

	const snapshotData = {
		rootPath: workspacePath,
		entries,
	};

	await writeFile("snapshot.json", JSON.stringify(snapshotData, null, 2));
};

await snapshot();
