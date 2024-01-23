export default function idGenerator() {
    const lowerAlphas = "abcdefghijklmnopqrstuvwxyz";  // 26
	const upperAlphas = lowerAlphas.toUpperCase();  // 26
	const digits = "0123456789";  // 10
	const combined = lowerAlphas + upperAlphas + digits;  // 62
	let id = "";
	for (let _ = 1; _ <= 20; _++) {
		const index = Math.floor(Math.random() * 62);
		id += combined[index];
	}
	return id;
}