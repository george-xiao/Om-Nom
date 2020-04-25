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

//returns the sorted array of posts to show to user
export function getPostSortedByScore(posts, userTagMap){
    // this map has the posts as keys 
    // and will have the score as the value
    let postMapWithScore = new Map();
    for(const post of posts){
        postMapWithScore.set(post, getPostScore(userTagMap, post.tags));
    }
    postMapWithScore = new Map([...postMapWithScore.entries()].sort((a, b) => b[1] - a[1]));
    return [...postMapWithScore.keys()];
}
