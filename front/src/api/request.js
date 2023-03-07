export const register = (data) => {

    return fetch('http://127.0.0.1:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    }).then(res => res.json())
}

export const login = (username, password) => {
    return fetch(`http://127.0.0.1:3001/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
       body: JSON.stringify({username, password})
    })
        .then(res => res.json())
}
export const logout = () => {
    return fetch(`http://127.0.0.1:3001/logout`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })
}

export const getArticles = (page) => {
    return fetch(`http://127.0.0.1:3001/articles?page=${page}`, {
        method: 'GET',
        credentials: 'include'
        }
    ).then(res => res.json())
    }

export const addArticle = (data) => {
    return fetch(`http://127.0.0.1:3001/article`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const changeArticle = (id,data)=>{
    return fetch(`http://127.0.0.1:3001/articles/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}

export const test = () => {
    return fetch(`http://127.0.0.1:3000`, {
        method: 'GET',
    })
        .then(res => res.json())
}

export const getFollowing = (username) => {
    return fetch(`http://127.0.0.1:3001/following/${username}`, {
            method: 'GET',
            credentials: 'include'
        }
    )
}

export const addFollowing = (username) => {
    return fetch(`http://127.0.0.1:3001/following/${username}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}

export const addComment = data => {
    return fetch(`http://127.0.0.1:3001/articles/comment`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ).then(res => res.json())
}

export const removeFollowing = (username) => {
    return fetch(`http://127.0.0.1:3001/following/${username}`, {
            method: 'DELETE',
            credentials: 'include'
        }
    ).then(res => res.json())
}

export const getAvatar = (username) => {
    return fetch(`http://127.0.0.1:3001/avatar/${username}`, {
            method: 'GET',
            credentials: 'include'
        }
    ).then(res => res.json())
}

export const changeEmail = (email) => {
    return fetch(`http://127.0.0.1:3001/email?email=${email}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}
export const changePhone = (phone) => {
    return fetch(`http://127.0.0.1:3001/email?phone=${phone}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}
export const changeZipcode = (zipcode) => {
    return fetch(`http://127.0.0.1:3001/zipcode?zipcode=${zipcode}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}
export const changeAvatar = (avatar) => {
    return fetch(`http://127.0.0.1:3001/avatar?avatar=${avatar}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}
export const changeDob = (dob) => {
    return fetch(`http://127.0.0.1:3001/dob?dob=${dob}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}
export const changeHeadline = (headline) => {
    return fetch(`http://127.0.0.1:3001/headline?headline=${headline}`, {
            method: 'PUT',
            credentials: 'include'
        }
    ).then(res => res.json())
}

export const uploadImage = (data) => {
    return new Promise(function (resolve, reject) {
        let formData = new FormData();
        formData.append('title', 'image');
        let file = {uri: data.path, type: 'application/octet-stream', name: 'image.jpg'};
        formData.append('images', file);
        fetch('http://127.0.0.1:3001/image', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data;charset=utf-8',
            },
            body: formData,
        }).then((response) => response.json())
            .then((responseData)=> {
                console.log('uploadImage', responseData);
                resolve(responseData);
            })
            .catch((err)=> {
                console.log('err', err);
                reject(err);
            });
    });

    /*    const formData = new FormData();
        formData.append('file', data);
        formData.append('title', 'image');


        const request = new XMLHttpRequest();
        request.withCredentials = true;
        request.onreadystatechange = () => {
            if (request.readyState === 4 && request.status === 200) {
                return JSON.parse(request.responseText);
            }
        };

        request.open('POST', "http://127.0.0.1:3001/image");
        request.setRequestHeader('Content-Type', 'multipart/form-data');
        request.onerror = () => {

        };
        //发送请求
        request.send(formData);*/
/*    return fetch(`http://127.0.0.1:3001/image`, {
            method: 'POST',
            credentials: 'include',
            headers:{
                'Content-Type': 'multipart/form-data'
            },
            data
        }
    ).then(res => res.json())*/
}
