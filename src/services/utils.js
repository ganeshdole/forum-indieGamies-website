const SERVERURL = import.meta.env.VITE_SERVERURL


export function createUrl(path){
    return `${SERVERURL}/${path}`
}

export function createError(error) {
    return {
        status: "error",
        error
    };
}

export function createSuccess(data) {
    return {
        status: "success",
        data
    };
}
