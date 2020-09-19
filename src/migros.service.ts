import { Injectable, HttpException } from "@nestjs/common";
import fetch from "node-fetch";

export interface ProductDescription {
  id: number;
}

export interface ProductInfo {
  productId: number,
  productName: string,
  productCategoriesCode: string,
  productImage_transparentOriginal: string,
  productPriceItemPrice: number,
  productOriginProducing_country?: string,
  productOriginCountry_of_Origin?: string
}

@Injectable()
export class MigrosService {
  async getProductInfo(description: ProductDescription): Promise<ProductInfo> {
    let res;
    try {
      res = await fetch(`${process.env.MIGROS_BASE_URL}/products?search=${description.id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${Buffer.from(process.env.MIGROS_API_KEY).toString('base64')}`
        }
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