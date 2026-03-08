const progress = () => {
	let percent = 0;
	const totalBlocks = 30;

	const interval = setInterval(() => {
		const filledBlocks = Math.floor((percent / 100) * totalBlocks);
		const emptyBlocks = totalBlocks - filledBlocks;

		const bar =
			"[" +
			"█".repeat(filledBlocks) +
			" ".repeat(emptyBlocks) +
			`] ${percent}%`;

		process.stdout.write("\r" + bar);

		if (percent >= 100) {
			clearInterval(interval);
			process.stdout.write("\n");
		}

		percent += 2;
	}, 100);
};

progress();
