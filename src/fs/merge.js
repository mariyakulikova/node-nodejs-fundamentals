import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const merge = async () => {
	// Write your code here
  // Default: read all .txt files from workspace/parts in alphabetical order
  // Optional: support --files filename1,filename2,... to merge specific files in provided order
  // Concatenate content and write to workspace/merged.txt
	const args = process.argv.slice(2);

	const partsDir = path.join("workspace", "parts");
	const outputFile = path.join("workspace", "merged.txt");

	let files = [];
	const i = args.indexOf("--files");
	if (i !== -1 && args[i + 1]) {
		files = args[i + 1].split(",");
	} else {
		const entries = await readdir(partsDir);
		files = entries.filter((f) => f.endsWith(".txt")).sort();
	}

	let merged = "";
	for (const name of files) {
		const filePath = path.join(partsDir, name);
		const content = await readFile(filePath, "utf8");
		merged += content;
	}

	await writeFile(outputFile, merged);
};

await merge();
