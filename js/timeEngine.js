const monthList = ["Sahatsa", "Samarsa", "Sarvadi", "Liangoth", "Greaneth", "Ieryll", "Eredeus", "Marineus", "Erenester"];
const EPOCH_GREG = new Date("1990-12-21T23:46:00Z");
const TALLUR_MINUTES_PER_HOUR = 90;
const TALLUR_HOURS_PER_DAY = 18;
const TALLUR_MINUTES_PER_DAY = TALLUR_HOURS_PER_DAY * TALLUR_MINUTES_PER_HOUR;
const GREG_SECONDS_PER_TALLUR_MINUTE = 112;

function tallurianToMinutes(month, day, hour, minute) {
    const monthIndex = monthList.indexOf(month);
    if (monthIndex === -1) throw new Error(`Invalid month: ${month}`);
    const totalDays = monthIndex * 63 + (day - 1);
    return totalDays * TALLUR_MINUTES_PER_DAY + hour * TALLUR_MINUTES_PER_HOUR + minute;
}

function minutesToTallurian(minutes) {
    const totalDays = Math.floor(minutes / TALLUR_MINUTES_PER_DAY);
    const calculatedYear = 1347 + Math.floor(totalDays / (9 * 63));
    let daysInYear = totalDays % (9 * 63);
    if (daysInYear < 0) daysInYear += 9 * 63;
    const monthIndex = Math.floor(daysInYear / 63);
    const day = (daysInYear % 63) + 1;
    let remaining = minutes % TALLUR_MINUTES_PER_DAY;
    if (remaining < 0) remaining += TALLUR_MINUTES_PER_DAY;
    const hour = Math.floor(remaining / TALLUR_MINUTES_PER_HOUR);
    const minute = remaining % TALLUR_MINUTES_PER_HOUR;
    return { year: calculatedYear, month: monthList[monthIndex], day, hour, minute };
}

/**
 * Converts ISO string (e.g. "1995-10-13T22:30") to Tallurian Object
 */
function convertToTallurian(isoDate) {
    const gDate = new Date(isoDate + 'Z');
    const diffSeconds = (gDate - EPOCH_GREG) / 1000;
    const tallurMinutesOffset = diffSeconds / GREG_SECONDS_PER_TALLUR_MINUTE;
    const epochMinutes = tallurianToMinutes("Liangoth", 34, 1, 79);
    const totalMinutes = epochMinutes + tallurMinutesOffset;

    const result = minutesToTallurian(Math.floor(totalMinutes));
    return result;
}