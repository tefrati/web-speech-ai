var rp = require('request-promise');

const runImageSearch = async searchQuery => {
    let qs = "?q=" + encodeURIComponent(searchQuery) + "&count=10&offset=0&license=ShareCommercially";
    var fullURL =  process.env.MS_COGNITIVE_IMAGE_SEARCH_DOMAIN + qs;
     
    try {
        let headers = {"Ocp-Apim-Subscription-Key": process.env.MS_COGNITIVE_SUBSCRIPTION_KEY, "Accept": "application/json"}
        let json = await rp({url:fullURL, json: true, headers: headers})
        
        if ( json && json.value && Array.isArray(json.value) && json.value.length>0 ) {
            let length = json.value.length
            let randomIndex = Math.floor(Math.random() * 10)
            return json.value[randomIndex].thumbnailUrl
        }
    }
    catch(err) {
        console.log("utility.runImageSearch caught an error: " + err)
    }
}

module.exports = {runImageSearch}