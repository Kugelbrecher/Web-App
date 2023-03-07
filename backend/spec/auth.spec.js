/*
 * Test suite for articles
 */
require("es6-promise").polyfill();
require("isomorphic-fetch");

const url = (path) => `http://localhost:3000${path}`;
const testUser={
    username:"test7231",
    password:"1234"
}
describe("Validate Registration and Login functionality", () => {



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

  it("get articles", (done) => {
    fetch(url("/articles"), {
      method: "GET",
      headers: { "Content-Type": "application/json", cookie: cookie }
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (res instanceof Array) expect(res.length).toBeGreaterThan(2);
        // console.log(res);
        done();
      });
    });
  });

  // it("get articles", (done) => {
  //   let loginUser = { username: "mrj3", password: "1234" };
  //   fetch(url("/login"), {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(loginUser),
  //   })
  //     .then((res) => {
  //       cookie = res.headers.get("set-cookie");
  //       return res.json();
  //     })
  //     .then((res) => {
  //       expect(res.username).toEqual("mrj3");
  //       expect(res.result).toEqual("success");

  //       return fetch(url("/articles"), {
  //         method: "GET",
  //         headers: { "Content-Type": "application/json", "cookie": cookie }
  //       })
  //         .then((res) => {
  //           return res.json();
  //         })
  //         .then((res) => {
  //           if (res instanceof Array) expect(res.length).toBeGreaterThan(2);
  //           console.log(res);
  //           done();
  //         });
  //     });
  // });

  // it("logout user", (done) => {
  //   let loginUser = { username: "mrj3", password: "1234" };
  //   beforeEach((done) => {
  //     fetch(url("/login"), {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(loginUser),
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((res) => {
  //         cookie = "sid=" + res["sid"];
  //         done();
  //       });
  //   });
  //   fetch(url("/logout"), {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((res) => {
  //       expect(res.result).toEqual("OK");
  //       done();
  //     });
  // });
// });
