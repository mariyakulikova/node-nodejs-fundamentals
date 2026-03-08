import { readFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";

const verify = async () => {
	// Write your code here
	// Read checksums.json
	// Calculate SHA256 hash using Streams API
	// Print result: filename — OK/FAIL
	try {
		const raw = await readFile("checksums.json");
		const checksums = JSON.parse(raw);

		for (const [filename, expectedHash] of Object.entries(checksums)) {
			const hash = createHash("sha256");

			const stream = createReadStream(filename);

			await new Promise((resolve, reject) => {
				stream.on("data", (chunk) => {
					hash.update(chunk);
				});

				stream.on("end", () => {
					const actualHash = hash.digest("hex");

					if (actualHash === expectedHash) {
						console.log(`${filename} — OK`);
					} else {
						console.log(`${filename} — FAIL`);
					}

					resolve();
				});

				stream.on("error", () => {
					console.log(`${filename} — FAIL`);
					reject();
				});
			});
		}
	} catch (err) {
		console.error("Error:", err.message);
	}
};

await verify();
