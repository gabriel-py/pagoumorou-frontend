const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const timestamp = (): number => Date.now() / 1000;

export { DAY, HOUR, MINUTE, timestamp };
