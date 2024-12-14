function formatDate(timeStamp) {
	if (!timeStamp) return null
	const date = new Date(timeStamp)
	return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()}`
}

module.exports = formatDate