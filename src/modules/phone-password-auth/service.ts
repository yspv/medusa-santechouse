import {
  AbstractAuthModuleProvider,
  isPresent,
  MedusaError,
  Modules,
} from "@medusajs/framework/utils";
import {
  AuthIdentityDTO,
  AuthIdentityProviderService,
  AuthenticationInput,
  AuthenticationResponse,
  Logger,
} from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";
import scrypt from "scrypt-kdf";
import { isString } from "@medusajs/framework/utils";

type InjectedDependencies = {
  logger: Logger;
  [ContainerRegistrationKeys.QUERY]: any;
};

class PhonePasswordAuthProviderService extends AbstractAuthModuleProvider {
  static identifier = "phonepass";
  static DISPLAY_NAME = "Phone Password";

  protected logger_: Logger;

  constructor(container: InjectedDependencies) {
    // @ts-ignore
    super(...arguments);
    this.logger_ = container.logger;
  }

  async hashPassword(password: string) {
    const hashConfig = { logN: 15, r: 8, p: 1 };
    const passwordHash = await scrypt.kdf(password, hashConfig);
    return passwordHash.toString("base64");
  }

  async upsertAuthIdentity(
    type: string,
    props: {
      phone: string;
      password: string;
      authIdentityService: AuthIdentityProviderService;
    },
  ) {
    const passwordHash = await this.hashPassword(props.password);
    const authIdentity =
      type === "create"
        ? await props.authIdentityService.create({
            entity_id: props.phone,
            provider_metadata: {
              password: passwordHash,
            },
          })
        : await props.authIdentityService.update(props.phone, {
            provider_metadata: {
              password: passwordHash,
            },
          });

    const copy = JSON.parse(JSON.stringify(authIdentity));
    const providerIdentity = copy.provider_identities?.find(
      (pi) => (pi.provider = this.identifier),
    );
    delete providerIdentity.provider_metadata?.password;
    return copy;
  }

  async register(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    const { phone, password } = data.body || {};
    if (!isString(phone)) {
      return {
        success: false,
        error: "Phone should be string",
      };
    }
    if (!isString(password)) {
      return {
        success: false,
        error: "Password should be string",
      };
    }
    try {
      const identity = await authIdentityProviderService.retrieve({
        entity_id: phone,
      });
      if (!isPresent(identity.app_metadata)) {
        const updatedAuthIdentity = await this.upsertAuthIdentity("update", {
          phone,
          password,
          authIdentityService: authIdentityProviderService,
        });
        return {
          success: true,
          authIdentity: updatedAuthIdentity,
        };
      }
      return {
        success: false,
        error: "User with phone number already exists",
      };
    } catch (error) {
      if (error.type !== MedusaError.Types.NOT_FOUND) {
        return { success: false, error: error.message };
      }
      const createdAuthIdentity = await this.upsertAuthIdentity("create", {
        phone,
        password,
        authIdentityService: authIdentityProviderService,
      });
      return {
        success: true,
        authIdentity: createdAuthIdentity,
      };
    }
  }

  async authenticate(
    data: AuthenticationInput,
    authIdentityProviderService: AuthIdentityProviderService,
  ): Promise<AuthenticationResponse> {
    const { phone, password } = data.body as {
      phone: string;
      password: string;
    };
    if (!phone || !password) {
      return {
        success: false,
        error: "Phone and password are required",
      };
    }
    if (!isString(phone)) {
      return {
        success: false,
        error: "Phone should be string",
      };
    }
    if (!isString(password)) {
      return {
        success: false,
        error: "Password should be string",
      };
    }
    let authIdentity: AuthIdentityDTO;
    try {
      authIdentity = await authIdentityProviderService.retrieve({
        entity_id: phone,
      });
    } catch (error) {
      if (error.type === MedusaError.Types.NOT_FOUND) {
        return {
          success: false,
          error: "Invalid phone or password",
        };
      }
      return { success: false, error: error.message };
    }

    const providerIdentity = authIdentity.provider_identities?.find(
      (pi) => pi.provider === this.identifier,
    );

    const passwordHash = providerIdentity?.provider_metadata?.password;
    if (isString(passwordHash)) {
      const buf = Buffer.from(passwordHash, "base64");
      const success = await scrypt.verify(buf, password);
      if (success) {
        const copy = JSON.parse(JSON.stringify(authIdentity));
        const providerIdentity = copy.provider_identities?.find(
          (pi) => (pi.provider = this.identifier),
        );
        delete providerIdentity.provider_metadata.password;
        return {
          success,
          authIdentity: copy,
        };
      }
    }
    return {
      success: false,
      error: "Invalid phone or password",
    };
  }
}

export default PhonePasswordAuthProviderService;
