import { Injectable, HttpException } from "@nestjs/common";
import fetch from "node-fetch";

export interface IngredientDescription {
  name: string;
  origin: string;
  transport?: "air" | "ground";
  production?: "standard" | "greenhouse" | "organic" | "fair-trade" | "farm" /* fishes & game only */ | "wild-caught" /* fishes & game only */;
  conservation?: "fresh" | "frozen" | "dried" | "conserved" | "canned" | "boiled-down";
  packaging?: "none" | "plastic" | "paper" | "pet" | "tin" | "alu" | "glas" | "cardboard" | "tetra";
}

export interface IngredientInfo {
  "co2-value": number;
  rating: string;
  "food-unit": number;
}

@Injectable()
export class EaternityService {
  async getIngredientInfo(description: IngredientDescription): Promise<IngredientInfo> {
    const date = new Date();
    let res;
    try {
      res = await fetch(`${process.env.EATERNITY_BASE_URL}/api/kitchens/${process.env.EATERNITY_KITCHEN_ID}/recipes/${process.env.EATERNITY_RECIPE_ID}?transient=true`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(process.env.EATERNITY_API_KEY).toString('base64')}`
        },
        body: JSON.stringify({
          "recipe": {
            "location": process.env.EATERNITY_LOCATION,
            "date": `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`,
            "ingredients": [
              {
                id: "hack",
                names: [{language: "de", value: description.name}],
                amount: 1000,
                unit: "gram",
                ...description
              }
            ]
          }
        })
      });
    } catch (err) {
      throw new HttpException(err.toString(), 500);
    }

    if (!res.ok) {
      throw new HttpException(await res.text(), res.status);
    }

    return await res.json();
  }
}