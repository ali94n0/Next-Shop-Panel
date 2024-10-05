export const includesObj = (oldObj, includesKey) => {
	const newObj = {};

	Object.keys(oldObj)
		.filter((key) => includesKey.includes(key))
		.forEach((key) => (newObj[key] = oldObj[key] || ""));

	return newObj;
};

export const arrOfObjtoNewArrOfObj = (oldArray, includeKeys) => {
	const newArray = oldArray.map((item) => {
		return includesObj(item, includeKeys);
	});
	return newArray;
};
