let tokens = {
    access_token: null,
    refresh_token: null,
}

export const user1 = {
    email:"helloworld@gmail.com",
    password: "hello1234",
    firstName: "John",
    lastName: "Doe"
};

export const setaccesstoken = token => tokens.access_token = token;
export const setrefreshtoken = token => tokens.refresh_token = token;
export const getaccesstoken = () => tokens.access_token;
export const getrefreshtoken = () => tokens.refresh_token;

describe('Dummy Test!', () => {
    it('should literally do nothing!', async ()=>{
        expect(true).toBeTruthy();
    })
})
