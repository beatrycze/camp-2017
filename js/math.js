// https://stackoverflow.com/a/10952773
const numberLength = num => Math.ceil(Math.log(num + 1) / Math.LN10);

const rounding = num => {
  const len = numberLength(num);
  const power = Math.pow(10, len);
  return Math.ceil(num / power) * power;
}

const getScale = (values, steps) => {
    const max = Math.max(...values);
    const maxRounded = rounding(max);
	const scale = [];
	const part = maxRounded / (steps - 1);
	for(let i = 0; i < steps; i++) {
        scale.push(Math.round(i * part));
	}
	return scale;
}
