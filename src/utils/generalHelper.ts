/**
 * Project: RssFrontend
 * Created by: diejoc20
 * Date: 13.06.24
 */
export const shorten = (toShorten: string):string => {
    if (toShorten.length >= 300) {
        return toShorten.slice(0, 301) + "...";
    }

    return toShorten;
}