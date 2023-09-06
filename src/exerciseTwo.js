const authorsData = {};

async function getPostAuthor(postId, cachedAuthors = {}) {
    const postResponse = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
    );

    if (!postResponse.ok) {
        throw new Error(`Failed to fetch the post with id ${postId}`);
    }

    const postData = await postResponse.json();

    const authorId = postData.userId;

    if (cachedAuthors[authorId]) {
        return cachedAuthors[authorId];
    }
    console.log(`Fetching Author: ${authorId}`);
    const authorResponse = await fetch(
        `https://jsonplaceholder.typicode.com/users/${authorId}`
    );
    if (!authorResponse.ok) {
        throw new Error(`Failed to fetch the user with id ${authorId}`);
    }
    const authorData = await authorResponse.json();
    cachedAuthors[authorId] = authorData;

    return authorData;
}

function getPostsAuthors(postIds) {
    // use getPostAuthor to fetch the author of every post from the postIds array
    // notice that the getPostsAuthors function is not marked as async

    // make sure not to make an API request for the same user more than once
    // thanks to the proper usage of the cachedAuthors property

    // if fetching one of the authors fails, throw an error with an appropriate message
    // "Failed to fetch the author of one of the posts"

    // do not change the getPostAuthor function
    // postIds.forEach(function(postId) {
    //     getPostAuthor(postId)
    // })
    return Promise.all(postIds.map(function(postId) {
      console.log(authorsData);
      return getPostAuthor(postId, authorsData);
    }))
}

async function getCorrectAuthors() {
    try {
        const authors = await getPostsAuthors([1, 11, 12]);
        console.log(authors[0].name); // Leanne Graham
        console.log(authors[1].name); // Ervin Howell
        console.log(authors[2].name); // Ervin Howell
    } catch (error) {
        // no errors should occur
    }
}

async function getIncorrectAuthors() {
    try {
        const authors = await getPostsAuthors([1, 9999999]);
    } catch (error) {
        console.log(error.message); // Failed to fetch the author of one of the posts
    }
}

getCorrectAuthors();
// getIncorrectAuthors();