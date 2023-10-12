function forMatTime(time) {
	let minutes = Math.floor(time / 60) || 0;
	const seconds = Math.round((time - (minutes * 60)) || 0);

	const forMattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

	return forMattedTime;
};

export default forMatTime;