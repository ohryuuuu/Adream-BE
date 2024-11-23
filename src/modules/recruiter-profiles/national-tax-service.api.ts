import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance } from "axios";
import { BusinessInfoDto } from "./dto/req/business-info.dto";

@Injectable()
export class NationalTaxService {

    static readonly baseURL = "https://api.odcloud.kr/api/nts-businessman/v1";
    static readonly authKey = process.env['OPEN_API_SECRETKEY'];
    private axios : AxiosInstance = axios;

    constructor() {
        this.axios.defaults.baseURL = NationalTaxService.baseURL;
        this.axios.defaults.headers['Authorization'] = NationalTaxService.authKey;
    }

    async isBusinessWorking(businessInfoDto : BusinessInfoDto) : Promise<boolean> {
        const businessObj = {
            b_no: businessInfoDto.businessNumber,
            start_dt: businessInfoDto.businessStartDate,
            p_nm: businessInfoDto.representativeName,
            b_nm: businessInfoDto.businessName
        }
        try {
            const { data } = await this.axios.post(`/validate?serviceKey=${NationalTaxService.authKey}`, {
                businesses : [businessObj]
            })
            if(data.status_code !== "OK") return false;
            const statusData = data?.data?.[0]?.status;
            if(!statusData) return false;
            if(statusData?.b_stt_cd !== "01") return false;
            return true;
        } catch(e) {
            return false;
        }
    }



}