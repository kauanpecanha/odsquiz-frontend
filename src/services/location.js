export const verifyCep = async (cep, setCepError) => {
    const cepUrl = `https://viacep.com.br/ws/${cep}/json/`

    return fetch(cepUrl)
        .then((request) => request.json())
        .then((data) => {
            if(!data.erro){
                setCepError(false)
                return true
            }
            else{
                setCepError(true)
                return false
            }
        })
        .catch(() => {
            setCepError(true)
        })
}

export const getCoordinates = async (address, setTryAgain, setError) => {
    const locationIQBaseUrl = `https://us1.locationiq.com/v1/search?key=pk.cf85b52eb08904e43721a3a3bbaf234f&q=${address}&format=json`

    return fetch(locationIQBaseUrl)
        .then((request) => request.json())
        .then((data) => {
            // Check if we actually got an array with results
            if (Array.isArray(data) && data.length > 0) {
                setTryAgain(false)
                setError(false)
                return [data[0].lat, data[0].lon]
            } else {
                // If data is empty or contains an error message (e.g. { error: "Unable to geocode" })
                throw new Error("Address not found"); 
            }
        })
        .catch(() => {
            setTryAgain(false) // Or true, depending on if you want them to retry the same address
            setError(true)
            return null; // <--- This prevents the crash!
        })
}