// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as express from "express";

declare namespace Express {
  export interface Session {
    [key: string]: any;
  }

  export interface Request {
    user: any;
    session?: Session;
  }
}

export type AuthenticatedRequest = {
  user?: any;
} & express.Request;
