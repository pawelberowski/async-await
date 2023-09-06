function modifyPost(postId, newTitle) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        .then(response => response.json())
        .then((postData) => {
            const modifiedPostData = {
                ...postData,
                title: newTitle
            }
            return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(modifiedPostData)
            })
        })
        .then((response) => {
            console.log('The post was modifed succesfully');
            return response.json();
        })
        .catch((error) => {
            console.log('Something went wrong', error);
        });
}

async function asyncModifyPost(postId, newTitle) {
    try {
        const postResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        const postData = await postResponse.json();
        const modifiedPostData = {
            ...postData,
            title: newTitle
        }
        const modifiedResponse = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modifiedPostData)
        })
        return await modifiedResponse.json();
    } catch (error) {
        console.log('Something went wrong', error);
    } finally {
        console.log("Async post modifying is finished")
    }
}

// modifyPost(1, 'Hello')
//     .then(result => {
//         console.log(result);
//     });

asyncModifyPost(1, 'New Hope')
    .then(function(result) {
        console.log(result);
    });

