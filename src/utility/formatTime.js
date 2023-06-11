function formatTime(time) {
	let minutes = Math.floor(time / 60) || 0;
	const seconds = Math.round((time - (minutes * 60)) || 0);
	
	const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

	return formattedTime;
};

export default formatTime;