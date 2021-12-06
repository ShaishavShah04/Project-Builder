let tokens = {
    access_token: null,
    refresh_token: null,
}

let working_tokens = {
    access_token: "accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFkODFmZjk1ZTBjYWQ0Yzc3YjllYmUiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE2Mzg3NjA5NTksImV4cCI6MTYzODc2MDk2OX0.L9Tj4N5BysNHfzrW35M0l8pjX58QGI86wZi2Ej2yhh4",
    refresh_token: "refreshToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWFkODFmZjk1ZTBjYWQ0Yzc3YjllYmUiLCJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJpYXQiOjE2Mzg3NjA5NTksImV4cCI6MTY1NjA0MDk1OX0.FyJzEx7KMdpDwFK5PZ1BYvMxlg1wAbdwv3EZBj9Ak2U",
}

export const user1 = {
    email:"helloworld@gmail.com",
    password: "hello1234",
    firstName: "John",
    lastName: "Doe"
};

export const project = {
    title: "Title 1",
    description: "blah blah blah",
    name: "John Doe",
    subtitle: "A testing project"
}

export const setaccesstoken = token => tokens.access_token = token;
export const setrefreshtoken = token => tokens.refresh_token = token;
export const getaccesstoken = () => tokens.access_token;
export const getrefreshtoken = () => tokens.refresh_token;
export const getworkingaccesstoken = () => working_tokens.access_token;
export const getworkingrefreshtoken = () => working_tokens.refresh_token;

describe('Dummy Test!', () => {
    it('should literally do nothing!', async ()=>{
        expect(true).toBeTruthy();
    })
})
