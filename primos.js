const factoresPrimos = num => {
    const factores = [];
    for (let i = 2; i <= num; i++) {
        while (num % i === 0) {
        factores.push(i);
        num /= i;
        }
    }
    return factores;
}

module.exports = {factoresPrimos};