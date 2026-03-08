import { createReadStream, createWriteStream } from "node:fs";

const split = async () => {
	return new Promise((resolve, reject) => {
		const args = process.argv;
		const i = args.indexOf("--lines");
		const linesPerChunk = i !== -1 ? parseInt(args[i + 1], 10) : 10;

		const rs = createReadStream("source.txt", { encoding: "utf8" });

		let tail = "";
		let lineCounter = 0;
		let chunkCounter = 1;
		let currentChunkLines = [];

		const writeChunk = (lines, addTrailingNewline = false) => {
			const ws = createWriteStream(`chunk_${chunkCounter}.txt`);
			ws.on("error", (err) => reject(err));
			const content = lines.join("\n") + (addTrailingNewline ? "\n" : "");
			ws.write(content);
			ws.end();
			chunkCounter++;
		};

		rs.on("data", (chunk) => {
			tail += chunk;
			const lines = tail.split("\n");
			tail = lines.pop() || "";

			lines.forEach((el) => {
				currentChunkLines.push(el);
				lineCounter++;

				if (lineCounter === linesPerChunk) {
					writeChunk(currentChunkLines, true);
					currentChunkLines = [];
					lineCounter = 0;
				}
			});
		});

		rs.on("end", () => {
			if (tail) {
				currentChunkLines.push(tail);
			}

			if (currentChunkLines.length > 0) {
				writeChunk(currentChunkLines, false);
			}

			resolve();
		});

		rs.on("error", (err) => reject(err));
	});
};

await split();
