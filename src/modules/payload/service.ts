import { MedusaError } from "@medusajs/framework/utils";
import {
  PayloadApiResponse,
  PayloadBulkResult,
  PayloadCollectionItem,
  PayloadItemResult,
  PayloadModuleOptions,
  PayloadQueryOptions,
  PayloadUpsertData,
} from "./types";
import qs from "qs";

type InjectedDependencies = {};

export class PayloadModuleService {
  private baseUrl: string;
  private headers: Record<string, string>;
  private defaultOptions: Record<string, any> = {
    is_from_medusa: true,
  };
  constructor(container: InjectedDependencies, options: PayloadModuleOptions) {
    this.baseUrl = `${options.serverUrl}/api`;
    this.headers = {
      "Content-Type": "application/json",
      Authorization: `${options.userCollection || "users"} API-Key ${options.userCollection}`,
    };
  }

  private async makeRequest<T = any>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => {});
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `Paylaod API error: ${response.status} ${response.statusText}. ${
            errorData.message || ""
          }`,
        );
      }
      return await response.json();
    } catch (err) {
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to communicate with Payload CMS: ${JSON.stringify(err)}`,
      );
    }
  }

  async create<T extends PayloadCollectionItem = PayloadCollectionItem>(
    collection: string,
    data: PayloadUpsertData,
    options: PayloadQueryOptions = {},
  ) {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      },
    );
    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadItemResult<T>>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });

    return result;
  }

  async update<T extends PayloadCollectionItem = PayloadCollectionItem>(
    collection: string,
    data: PayloadUpsertData,
    options: PayloadQueryOptions = {},
  ) {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      },
    );
    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadItemResult<T>>(endpoint, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    return result;
  }

  async delete(
    collection: string,
    options: PayloadQueryOptions = {},
  ): Promise<PayloadApiResponse> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      },
    );
    const endpoint = `/${collection}/${stringifiedQuery}`;

    const result = await this.makeRequest<PayloadApiResponse>(endpoint, {
      method: "DELETE",
    });

    return result;
  }

  async find(
    collection: string,
    options: PayloadQueryOptions = {},
  ): Promise<PayloadBulkResult<PayloadCollectionItem>> {
    const stringifiedQuery = qs.stringify(
      {
        ...options,
        ...this.defaultOptions,
      },
      {
        addQueryPrefix: true,
      },
    );
    const endpoint = `/${collection}${stringifiedQuery}`;

    const result =
      await this.makeRequest<PayloadBulkResult<PayloadCollectionItem>>(
        endpoint,
      );

    return result;
  }

  async list(filter: { product_id: string | string[] }) {
    const collection = filter.product_id ? "products" : "unknown";
    const ids = Array.isArray(filter.product_id)
      ? filter.product_id
      : [filter.product_id];
    const result = await this.find(collection, {
      where: {
        medusa_id: {
          in: ids.join(","),
        },
      },
      depth: 2,
    });

    return result.docs.map((doc) => ({
      ...doc,
      product_id: doc.medusa_id,
    }));
  }
}
