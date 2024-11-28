export class VerifyInfoDto {
    verifyCode : string;
    verifyUrl : string;
    
    constructor(verifyCode:string, verifyUrl:string) {
        this.verifyCode = verifyCode;
        this.verifyUrl = verifyUrl;
    }
}