import express from "express";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from "@jest/globals";

type RouteHandler = (req: any, res: any, next?: any) => Promise<unknown> | unknown;

let setupRoutes: (app: express.Express) => import("http").Server;
let storageModule: any;

const findRouteHandler = (
  app: express.Express,
  path: string,
  method: "get" | "post" | "put" | "delete" | "patch",
): RouteHandler => {
  const stack = ((app as unknown as { _router?: { stack?: any[] } })._router?.stack ?? []) as any[];

  for (const layer of stack) {
    if (layer?.route?.path === path && layer.route?.methods?.[method]) {
      const handlers = layer.route.stack ?? [];
      const last = handlers[handlers.length - 1];
      if (!last) {
        throw new Error(`No handlers found for ${method.toUpperCase()} ${path}`);
      }
      return last.handle as RouteHandler;
    }
  }

  throw new Error(`Route handler for ${method.toUpperCase()} ${path} not found`);
};

const createMockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.setHeader = jest.fn().mockReturnValue(res);
  return res;
};

beforeAll(async () => {
  jest.resetModules();
  process.env.DATABASE_URL =
    process.env.DATABASE_URL ?? "postgres://user:pass@localhost:5432/test";

  await jest.unstable_mockModule("../observability", () => ({
    __esModule: true,
    logCoverPhotoFailure: jest.fn(),
    logActivityCreationFailure: jest.fn(),
    trackActivityCreationMetric: jest.fn(),
  }));

  await jest.unstable_mockModule("../vite", () => ({
    __esModule: true,
    log: jest.fn(),
    setupVite: jest.fn(),
    serveStatic: jest.fn(),
  }));

  await jest.unstable_mockModule("../sessionAuth", () => ({
    __esModule: true,
    setupAuth: jest.fn(),
    isAuthenticated: (_req: any, _res: any, next: any) => next(),
  }));

  await jest.unstable_mockModule("../coverPhotoUpload", () => ({
    __esModule: true,
    registerCoverPhotoUploadRoutes: jest.fn(),
  }));

  await jest.unstable_mockModule("ws", () => ({
    __esModule: true,
    WebSocketServer: jest.fn(() => ({
      on: jest.fn(),
      close: jest.fn(),
    })),
    WebSocket: { OPEN: 1 },
  }));

  const routesModule: any = await import("../routes");
  setupRoutes = routesModule.setupRoutes;

  storageModule = await import("../storage");
});

describe("Flight proposal endpoint aliases", () => {
  let app: express.Express;
  let httpServer: import("http").Server;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    httpServer = setupRoutes(app);
  });

  afterEach(async () => {
    await new Promise<void>((resolve) => {
      httpServer.close(() => resolve());
    });
  });

  it("GET alias /api/trips/:id/flight-proposals returns data using shared handler", async () => {
    const handler = findRouteHandler(app, "/api/trips/:id/flight-proposals", "get");
    const getTripFlightProposalsMock = jest
      .spyOn(storageModule.storage, "getTripFlightProposals")
      .mockResolvedValueOnce([{ id: 1, tripId: 42 }]);

    const req: any = {
      params: { id: "42" },
      query: { mineOnly: "true" },
      session: { userId: "user-1" },
      user: { id: "user-1" },
    };
    const res = createMockResponse();

    await handler(req, res);

    expect(getTripFlightProposalsMock).toHaveBeenCalledWith(42, "user-1", {
      proposedBy: "user-1",
    });
    expect(res.json).toHaveBeenCalledWith([{ id: 1, tripId: 42 }]);
  });

  it("POST alias /api/trips/:id/flight-proposals accepts flightId payload", async () => {
    const handler = findRouteHandler(app, "/api/trips/:id/flight-proposals", "post");

    jest.spyOn(storageModule.storage, "getUser").mockResolvedValue({ id: "user-1" } as any);
    const ensureFlightProposalForSavedFlightMock = jest
      .spyOn(storageModule.storage, "ensureFlightProposalForSavedFlight")
      .mockResolvedValueOnce({
        proposal: { id: 99, tripId: 42 },
        wasCreated: true,
        flightId: 77,
      });

    const req: any = {
      params: { id: "42" },
      body: { flightId: 77 },
      session: { userId: "user-1" },
      user: { id: "user-1" },
      headers: {},
      get: jest.fn(),
      header: jest.fn(),
      originalUrl: "/api/trips/42/flight-proposals",
    };
    const res = createMockResponse();

    await handler(req, res);

    expect(ensureFlightProposalForSavedFlightMock).toHaveBeenCalledWith({
      flightId: 77,
      tripId: 42,
      currentUserId: "user-1",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 99, tripId: 42 });
  });
});
