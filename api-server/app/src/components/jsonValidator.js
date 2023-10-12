import { Validator, ValidationError } from "express-json-validator-middleware";

export const jsonSchema =
{
    type : "object",
    required: ["buildings"],
    properties:
    {
        buildings :
        {
            type: "array",
            building:
            {
                required: ["user", "companyCode", "businessEntity", "buildingID", "zipCode", "city", "street", "houseNr", "rooms", "details", "validFrom", "validUntil", "edit", "info"],
                properties:
                {
                    user:{type: "string"},
                    companyCode:{type: "string"},
                    businessEntity:{ type: "string"},
                    buildingID:{ type: "string"},
                    zipCode:{ type: "string"},
                    city:{ type: "string"},
                    street:{ type: "string"},
                    houseNr:{ type: "string"},
                    rooms:{ type: "string"},
                    details:{ type: "string"},
                    validFrom:{ type: "string"},
                    validUntil:{ type: "string"},
                    edit:{ type: "string"},
                    info:{ type: "string"}
                }
            }    
        }
    }
};

export const { validate } = new Validator();
export class ValidationErrorType extends ValidationError
{

}

