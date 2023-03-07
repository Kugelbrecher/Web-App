/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;
// TODO: everytime we run the test, we need to assign a new username which is not in the database
const testUser={
    username:"newUser",
    password:"123"
}

describe("Validate Draft Backend", () => {
    let cookie;
    it("register new user", (done) => {
        fetch(url("/register"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
        })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                expect(res.username).toEqual(testUser.username);
                expect(res.result).toEqual("success");
                done();
            })
    });

    it("login user", (done) => {
        fetch(url("/login"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(testUser),
        })
            .then((res) => {
                cookie = res.headers.get("set-cookie");
                return res.json();
            })
            .then((res) => {
                expect(cookie).toContain("sid");
                expect(res.username).toEqual(testUser.username);
                expect(res.result).toEqual("success");
                done();
            });
    });

    it("Only returns articles for logged in user", (done) => {
        fetch(url("/articles"), {
            method: "GET",
            headers: { "Content-Type": "application/json", cookie: cookie },
        })
            .then((res) => res.json())
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    expect(res[i].username).toEqual(testUser.username);
                }
                done();
            });
    });
    it("should add new article with successive article id, return list of articles with new article", (done) => {
        let post = { author: testUser.username, text: "A new post" };
        fetch(url("/article"), {
            method: "POST",
            headers: { "Content-Type": "application/json", cookie: cookie },
            body: JSON.stringify(post),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res instanceof Array) {
                    var last = res[res.length - 1];
                    expect(last.id).toBe(res.length - 1);
                    expect(last.author).toEqual(testUser.username);
                    expect(last.text).toEqual("A new post");
                }
                done();
            });
    });

    it("should return an article with a specified id", (done) => {
        fetch(url("/articles/4"), {
            method: "GET",
            headers: { "Content-Type": "application/json", cookie: cookie },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res.length){
                    const _res = res[0]
                    expect(parseInt(_res.id)).toEqual(4);
                    expect(_res.author).toEqual("Zack");
                    expect(_res.text).toEqual("Zack's post");
                }
                done();
            });
    });

    it("should update the user's headline", (done) => {
        fetch(url("/headline"), {
            method: "PUT",
            headers: { "Content-Type": "application/json", cookie: cookie },
            body: JSON.stringify({headline:"new headline"})
        })
            .then((res) => res.json())
            .then((res) => {
                expect(res.headline).toEqual("new headline");
                done();
            });
    });

    it("should return the user's headline", (done) => {
        fetch(url("/headline"), {
            method: "GET",
            headers: { "Content-Type": "application/json", cookie: cookie },
        })
            .then((res) => res.json())
            .then((res) => {
                    // expect(typeof res.headline).toEqual("string");
                    expect(res.headline).toEqual("new headline");
                    done();
                }
            );
    });

    it("logout user", (done) => {
        fetch(url("/logout"), {
            method: "PUT",
            headers: { cookie: cookie },
        })
            .then((res) => {
                // note: res.text() is a promise, used if res.send('logout') is used
                // else res.json() is used if res.send({msg: 'logout'}) is used
                return res.text();
            })
            .then((res) => {
                // change res.msg if we use json
                expect(res).toEqual("Logout");
                done();
            })
        //     .catch(err=>{
        //         console.log('err',err)
        // });
    });

});

