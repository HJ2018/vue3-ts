import service from '.'

interface LoginData{
    userName: string,
    passWord: string
}

export function loginRequest(data: LoginData) {
    
    return service({
        url:'/login',
        method:'post',
        data
    })
    
}