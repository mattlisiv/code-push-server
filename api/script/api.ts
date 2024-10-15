// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Router, RequestHandler } from "express";

import { getHeadersMiddleware, HeadersConfig } from "./routes/headers";
import { getAcquisitionRouter, getHealthRouter, AcquisitionConfig } from "./routes/acquisition";
import { getManagementRouter, ManagementConfig } from "./routes/management";
import { PassportAuthentication, AuthenticationConfig } from "./routes/passport-authentication";
import { AppInsights } from "./routes/app-insights";
import { InputSanitizer } from "./routes/input-sanitizer";
import { RequestTimeoutHandler } from "./routes/request-timeout";

/**
 * Middleware to add headers to the response.
 * @param config
 */
export function headers(config: HeadersConfig): RequestHandler {
  return getHeadersMiddleware(config);
}

/**
 * Router for acquisition routes.
 * @param config
 */
export function acquisition(config: AcquisitionConfig): Router {
  return getAcquisitionRouter(config);
}

/**
 * Router for health routes.
 * @param config
 */
export function health(config: AcquisitionConfig): Router {
  return getHealthRouter(config);
}

/**
 * Router for management routes.
 * @param config
 */
export function management(config: ManagementConfig): Router {
  return getManagementRouter(config);
}

/**
 * Middleware to handle authentication.
 * @param config Configuration for authentication.
 */
export function auth(config: AuthenticationConfig): any {
  const passportAuthentication = new PassportAuthentication(config);
  return {
    router: passportAuthentication.getRouter.bind(passportAuthentication),
    legacyRouter: passportAuthentication.getLegacyRouter.bind(passportAuthentication),
    authenticate: passportAuthentication.authenticate,
  };
}

/**
 * Middleware to handle application insights.
 */
export function appInsights(): any {
  const appInsights = new AppInsights();

  return {
    router: appInsights.getRouter.bind(appInsights),
    errorHandler: appInsights.errorHandler.bind(appInsights),
  };
}

/**
 * Middleware to sanitize input.
 */
export function inputSanitizer(): any {
  return InputSanitizer;
}

/**
 * Middleware to handle request timeout.
 */
export function requestTimeoutHandler(): RequestHandler {
  return RequestTimeoutHandler;
}
