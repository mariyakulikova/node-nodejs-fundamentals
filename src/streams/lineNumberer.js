import { Transform } from "node:stream";

const lineNumberer = () => {
	let tail = "";
	let counter = 1;
	const patternTransform = new Transform({
		transform(chunk, enc, cb) {
			const strChunk = String(chunk);
			tail += strChunk;
			const lines = tail.split("\n");
			tail = lines.pop();
			lines.forEach((el, idx, arr) => this.push(counter++ + " " + el + "\n"));
			cb();
		},

		flush(cb) {
			if (tail.length > 0) {
				this.push(counter + " " + tail + "\n");
			}
			cb();
		},
	});

	process.stdin.pipe(patternTransform).pipe(process.stdout);
};

lineNumberer();
