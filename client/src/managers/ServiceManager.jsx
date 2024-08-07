export const getServices = () => {
    return fetch("/api/service").then((response) => response.json())
}
