export function getLastNumber(url){
    let end = url.lastIndexOf('/')
    let start = end - 2
    if(url.charAt(start) === '/') {
        start++
    }
    return url.slice(start, end)
    }

export function removeChildren(element) {
        while (element.firstChild) {
        element.removeChild(element.firstChild)
    }}