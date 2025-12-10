export function shortDateStr() {
    return new Date().toISOString().split('T')[0];
}
