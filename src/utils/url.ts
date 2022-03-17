export const parseParams = (queryString: string):any => {
    let param: { [key:string]: string } = {}
    if (typeof queryString !== "string") return {};
    if (queryString.indexOf("?") === 0) {
        queryString = queryString.replace("?", "")
    }
    if (queryString.indexOf("#") === 0) {
        queryString = queryString.replace("#", "")
    }
    let pieceList:string[] = queryString.split("&")
    for (let index = 0; index < pieceList.length; index++) {
        let paramPiece = pieceList[index].split("=")
        if (paramPiece.length !== 2) continue;
        if (!paramPiece[1]) continue;
        param[paramPiece[0]] = decodeURIComponent(paramPiece[1])
    }
    return param;
}