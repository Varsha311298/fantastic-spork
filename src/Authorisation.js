export function getToken() {
    return localStorage.token;
}

export function getName() {
    return localStorage.name;
}

export function isLoggedIn() {
    return !!localStorage.token
}