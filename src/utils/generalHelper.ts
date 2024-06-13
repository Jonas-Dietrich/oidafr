export const shorten = (toShorten: string):string => {
    if (toShorten.length >= 300) {
        return toShorten.slice(0, 301) + "...";
    }

    return toShorten;
}