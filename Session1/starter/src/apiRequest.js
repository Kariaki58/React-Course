const apiRequest = async (url = '', optionobj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionobj)
        if (!response.ok) throw Error("Error occured")
    } catch(err) {
        errMsg = err.message
    } finally {
        return errMsg
    }
}

export default apiRequest
