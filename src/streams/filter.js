import { Transform } from "node:stream";

const filter = () => {
	const args = process.argv;
	const i = args.indexOf("--pattern");
	const pattern = i !== -1 ? args[i + 1] : undefined;

	if (!pattern) {
		process.stderr.write("No arguments\n");
		process.exitCode = 1;
		return;
	}

	let tail = "";
	const patternTransform = new Transform({
		transform(chunk, enc, cb) {
			const strChunk = String(chunk);
			tail += strChunk;
			const lines = tail.split("\n");
			tail = lines.pop();
			lines.forEach((el, idx, arr) => {
				if (el.includes(pattern)) {
					this.push(el + "\n");
				}
			});
			cb();
		},

		flush(cb) {
			if (tail.length > 0 && tail.includes(pattern)) {
				this.push(tail + "\n");
			}
			cb();
		},
	});

	process.stdin.pipe(patternTransform).pipe(process.stdout);
};

filter();
