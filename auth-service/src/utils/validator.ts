export class Validator{

    static isEmail ( email: string ) {
        const pattern =
          /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return pattern.test(email);
    }
      
    static isPassword ( password:string ){
        if (!password || password.length < 6) {
            return false;
        }
        return true
    }
}