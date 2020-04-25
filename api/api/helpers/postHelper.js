// postTags is a string array of tags
// return the score
export function getPostScore(userTagMap, postTags){
    let score = 0;
    for(const tag of postTags){
        if (userTagMap.has(tag)){
            score += userTagMap.get(tag);
        }
    }
    return score;
}

