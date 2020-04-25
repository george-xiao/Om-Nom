
// function that takes in a map  of [[tag,number of times liked]]
// and outputs top n tags
// assumes tagMap is already sorted
function getTopNTags(n, tagMap){
    // where n is the number of tags to get
    let keys = [];
    if (tagMap.length < n){
        n = tagMap.length;
    }
    // only get the tags as an array
    let tags = Array.from(tagMap.keys());
    for(let i = 0; i < n; i++){
        keys.push(tags[i]);
    }
    return keys;
}

