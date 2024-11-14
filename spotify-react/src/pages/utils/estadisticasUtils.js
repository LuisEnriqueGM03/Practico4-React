export const calcularStatNivel100 = (stat, esHP = false) => {
    if (stat === null || stat === undefined) return 'N/A';

    const nivel = 100;

    const ivMin = 0;
    const evMin = 0;
    const naturalezaMin = 0.9;

    const ivMax = 31;
    const evMax = 252;
    const naturalezaMax = 1.1;
    if (esHP) {
        const min = Math.floor(((2 * stat + ivMin + evMin / 4) * nivel) / 100 + nivel + 10);
        const max = Math.floor(((2 * stat + ivMax + evMax / 4) * nivel) / 100 + nivel + 10);
        return `${min} - ${max}`;
    } else {
        const min = Math.floor((((2 * stat + ivMin + evMin / 4) * nivel) / 100 + 5) * naturalezaMin);
        const max = Math.floor((((2 * stat + ivMax + evMax / 4) * nivel) / 100 + 5) * naturalezaMax);
        return `${min} - ${max}`;
    }
};
