function exampleFunction(){
    return 2 + 2
}

function validateCPF(cpf) {
    // Verifica se o CPF contém apenas números
    if (!/^\d+$/.test(cpf)) {
        return false;
    }

    // Verifica se o CPF tem 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se todos os os digitos são iguais
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Verifica o primeiro dígito verificador
    let sum = 0;
    let remainder;


    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(9))) {
        return false;
    }

    // Verifica o segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    remainder = (sum * 10) % 11;

    if (remainder === 10 || remainder === 11) {
        remainder = 0;
    }
    if (remainder !== parseInt(cpf.charAt(10))) {
        return false;
    }

    return true;
}

module.exports = {
    exampleFunction,
    validateCPF,
    // Add other helper functions here
};













