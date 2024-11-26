export function generateExpirationDate(expirationTermDays) {
    const today = new Date();
    const oneYearInMilliseconds = expirationTermDays * 24 * 36000;
    const expirationDate = new Date(today.getTime() + oneYearInMilliseconds);
    return expirationDate;
}