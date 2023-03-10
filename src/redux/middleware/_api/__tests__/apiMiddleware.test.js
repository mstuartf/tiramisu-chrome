import { buildApiMiddleware } from "../index";

describe("_api middleware", () => {
  let store;
  let next;
  let apiMiddleware;

  beforeEach(() => {
    store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => ({ token: "__TOKEN__" })),
    };
    next = jest.fn();
  });

  beforeEach(() => {
    fetch.resetMocks();
    fetch.mockClear();
  });

  describe("trailing slash config", () => {
    test("should append a slash to the url if appendSlash=true and the url does not end in a slash", async () => {
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => ({}),
        {
          appendSlash: true,
        }
      );
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual("__BASE_URL__/__URL__/");
    });

    test("should not append a slash to the url if appendSlash=true but the url does end in a slash", async () => {
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => ({}),
        {
          appendSlash: true,
        }
      );
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__/",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual("__BASE_URL__/__URL__/");
    });

    test("should not append a slash to the url if appendSlash=false even if the url does not end in a slash", async () => {
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => ({}),
        {
          appendSlash: false,
        }
      );
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual("__BASE_URL__/__URL__");
    });
  });

  describe("default configuration", () => {
    beforeEach(() => {
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => ({
          AUTH_HEADER: `Token ${store.getState().token}`,
        })
      );
    });

    test("should not trigger fetch or dispatch new actions if the action received has no meta", async () => {
      // ARRANGE
      const action = { type: "__TYPE__" };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).not.toHaveBeenCalled();
    });

    test("should not trigger fetch or dispatch new actions if the action received has no meta.request", async () => {
      // ARRANGE
      const action = { type: "__TYPE__", meta: {} };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).not.toHaveBeenCalled();
    });

    test("should trigger a fetch to the url in the meta.request config and using the url builder result", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual("__BASE_URL__/__URL__");
    });

    test("should trigger a fetch to the url in the meta.request config and without the url builder result if the action url has a protocol", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "http://__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual("http://__URL__");
    });

    test("should default to an authenticated request and fetch the token from the store", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.headers["AUTH_HEADER"]).toEqual("Token __TOKEN__");
    });

    test("should not add a token if the request is unauthenticated", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            authenticated: false,
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.headers["Authorization"]).toEqual(undefined);
    });

    test("should default to GET if no method is provided", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.method).toEqual("GET");
    });

    test("should use the config method if provided", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            method: "__METHOD__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.method).toEqual("__METHOD__");
    });

    test("should set content type to application/json", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.headers["Content-Type"]).toEqual("application/json");
    });

    test("should not set the content type header if headers are passed", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            headers: {},
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.headers["Content-Type"]).toEqual(undefined);
    });

    test("should append config params to url if provided", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            params: {
              param_1: "value_1",
              param_2: ["value_2", "value_3"],
            },
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(url).toEqual(
        "__BASE_URL__/__URL__?param_1=value_1&param_2=value_2&param_2=value_3"
      );
    });

    test("should attach the stringified payload to the init object if provided", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            method: "POST",
            payload: {
              data: ["a", "b", "c"],
            },
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      const [url, init] = fetch.mock.calls[0];
      expect(init.body).toEqual('{"data":["a","b","c"]}');
    });

    test("should dispatch a pending action", async () => {
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Pending",
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch a success action for successful requests", async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: "__DATA__" }), {
        status: 200,
      });
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Success",
        payload: { data: "__DATA__" },
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch an empty success action for 204 responses", async () => {
      fetch.mockResponseOnce(null, {
        status: 204,
      });
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Success",
        payload: null,
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch a failure action for unsuccessful requests", async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: "__DATA__" }), {
        status: 400,
      });
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Failure",
        payload: {
          status: 400,
          body: { data: "__DATA__" },
        },
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch a failure action if fetch fails", async () => {
      fetch.mockImplementation(async () => {
        throw new Error("Failed to fetch");
      });
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Failure",
        payload: {
          status: 0,
          body: "Error: Failed to fetch",
        },
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch a partial success action for 207 responses", async () => {
      fetch.mockResponseOnce(JSON.stringify({ data: "__DATA__" }), {
        status: 207,
      });
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__PartialSuccess",
        payload: { data: "__DATA__" },
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    test("should dispatch a failure action if the API returns an invalid JSON", async () => {
      fetch.mockResponseOnce("__INVALID_JSON__");
      // ARRANGE
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
          },
        },
      };
      // ACT
      await apiMiddleware(store)(next)(action);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(fetch).toHaveBeenCalled();
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Failure",
        payload: {
          body: expect.anything(),
          status: 200,
        },
        meta: {
          originalRequest: {
            url: "__URL__",
          },
        },
      });
    });

    describe("custom response handlers", () => {
      beforeEach(() => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 200 });
      });

      test("should trigger the first matching custom handler", async () => {
        // ARRANGE
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            customHandlers: [
              {
                matcher: ({ status }) => true,
                handler: ({ store }) =>
                  store.dispatch({ type: "__CUSTOMER_HANDLER_ACTION_TYPE__" }),
              },
            ],
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
            },
          },
        };
        // ACT
        await apiMiddleware(store)(next)(action);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(fetch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__CUSTOMER_HANDLER_ACTION_TYPE__",
        });
      });

      test("should make the original request available to the custom handler", async () => {
        // ARRANGE
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            customHandlers: [
              {
                matcher: ({ status }) => true,
                handler: ({ store, request }) =>
                  store.dispatch({
                    type: "__CUSTOMER_HANDLER_ACTION_TYPE__",
                    meta: { originalRequest: request },
                  }),
              },
            ],
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
            },
          },
        };
        // ACT
        await apiMiddleware(store)(next)(action);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(fetch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__CUSTOMER_HANDLER_ACTION_TYPE__",
          meta: {
            originalRequest: {
              url: "__URL__",
            },
          },
        });
      });

      test("should trigger the default handlers if no custom handlers match", async () => {
        // ARRANGE
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            customHandlers: [
              {
                matcher: ({ status }) => false,
                handler: ({ store }) =>
                  store.dispatch({ type: "__CUSTOMER_HANDLER_ACTION_TYPE__" }),
              },
            ],
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
            },
          },
        };
        // ACT
        await apiMiddleware(store)(next)(action);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(fetch).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__TYPE__Success",
          payload: {},
          meta: {
            originalRequest: {
              url: "__URL__",
            },
          },
        });
      });
    });
  });

  describe("mock data for development", () => {
    beforeEach(() => {
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => store.getState().token,
        {
          useMocksWhen: () => true,
        }
      );
    });

    test("should dispatch a pending action for all mock responses", () => {
      // ARRANGE
      jest.useFakeTimers();
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            mockData: {},
          },
        },
      };
      // ACT
      apiMiddleware(store)(next)(action);
      jest.advanceTimersByTime(1000);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Pending",
        meta: {
          originalRequest: {
            url: "__URL__",
            mockData: {},
          },
        },
      });
    });

    test("should dispatch a success action for mock 200 status responses", () => {
      // ARRANGE
      jest.useFakeTimers();
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            mockData: {
              status: 200,
              body: "__BODY__",
            },
          },
        },
      };
      // ACT
      apiMiddleware(store)(next)(action);
      jest.advanceTimersByTime(1000);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Success",
        payload: "__BODY__",
        meta: {
          originalRequest: {
            url: "__URL__",
            mockData: {
              status: 200,
              body: "__BODY__",
            },
          },
        },
      });
    });

    test("should dispatch a failure action for mock 400 status responses", () => {
      // ARRANGE
      jest.useFakeTimers();
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            mockData: {
              status: 400,
              body: "__BODY__",
            },
          },
        },
      };
      // ACT
      apiMiddleware(store)(next)(action);
      jest.advanceTimersByTime(1000);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Failure",
        payload: {
          status: 400,
          body: "__BODY__",
        },
        meta: {
          originalRequest: {
            url: "__URL__",
            mockData: {
              status: 400,
              body: "__BODY__",
            },
          },
        },
      });
    });

    test("should load mock data from json files", async () => {
      // ARRANGE
      jest.useFakeTimers();
      apiMiddleware = buildApiMiddleware(
        () => "__BASE_URL__",
        (store) => store.getState().token,
        {
          useMocksWhen: () => true,
          jsonMocksLdr: (path) => ({
            then: (fn) => fn({ default: `${path}__DATA` }),
          }),
        }
      );
      const action = {
        type: "__TYPE__",
        meta: {
          request: {
            url: "__URL__",
            mockData: {
              json: "__JSON_FILE_PATH__",
            },
          },
        },
      };
      // ACT
      apiMiddleware(store)(next)(action);
      jest.advanceTimersByTime(1000);
      // ASSERT
      expect(next).toHaveBeenCalledWith(action);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
      expect(store.dispatch).toHaveBeenCalledWith({
        type: "__TYPE__Success",
        payload: "__JSON_FILE_PATH____DATA",
        meta: {
          originalRequest: {
            url: "__URL__",
            mockData: {
              json: "__JSON_FILE_PATH__",
            },
          },
        },
      });
    });

    describe("custom response handlers", () => {
      test("should trigger the first matching custom handler", async () => {
        // ARRANGE
        jest.useFakeTimers();
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            customHandlers: [
              {
                matcher: ({ status }) => true,
                handler: ({ store }) =>
                  store.dispatch({ type: "__CUSTOMER_HANDLER_ACTION_TYPE__" }),
              },
            ],
            useMocksWhen: () => true,
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        };
        // ACT
        apiMiddleware(store)(next)(action);
        jest.advanceTimersByTime(1000);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__CUSTOMER_HANDLER_ACTION_TYPE__",
        });
      });

      test("should trigger the default handlers if no custom handlers match", async () => {
        // ARRANGE
        jest.useFakeTimers();
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            customHandlers: [
              {
                matcher: ({ status }) => false,
                handler: ({ store }) =>
                  store.dispatch({ type: "__CUSTOMER_HANDLER_ACTION_TYPE__" }),
              },
            ],
            useMocksWhen: () => true,
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        };
        // ACT
        apiMiddleware(store)(next)(action);
        jest.advanceTimersByTime(1000);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__TYPE__Success",
          payload: "__BODY__",
          meta: {
            originalRequest: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        });
      });

      test("should trigger handlers after the custom duration if provided", async () => {
        // ARRANGE
        jest.useFakeTimers();
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) => store.getState().token,
          {
            useMocksWhen: () => true,
            mockRequestDuration: 2000,
          }
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        };
        // ACT
        apiMiddleware(store)(next)(action);
        jest.advanceTimersByTime(1000);
        // ASSERT
        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(store.dispatch).not.toHaveBeenCalledWith({
          type: "__TYPE__Success",
          payload: "__BODY__",
          meta: {
            originalRequest: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        });
        jest.advanceTimersByTime(1000);
        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenCalledWith({
          type: "__TYPE__Success",
          payload: "__BODY__",
          meta: {
            originalRequest: {
              url: "__URL__",
              mockData: {
                status: 200,
                body: "__BODY__",
              },
            },
          },
        });
      });
    });

    describe("async authHeaderBuilder (i.e. support for Auth0)", () => {
      test("should fetch the token asynchronously if the authHeaderBuilder returns a promise", async () => {
        // ARRANGE
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          (store) =>
            new Promise((resolve) => {
              resolve({
                AUTH_HEADER: "Token __TOKEN__",
              });
            })
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
            },
          },
        };
        // ACT
        await apiMiddleware(store)(next)(action);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(fetch).toHaveBeenCalled();
        const [url, init] = fetch.mock.calls[0];
        expect(init.headers["AUTH_HEADER"]).toEqual("Token __TOKEN__");
      });

      test("should not call the authHeaderBuilder if the request is not authenticated", async () => {
        // ARRANGE
        const authHeaderBuilder = jest.fn();
        apiMiddleware = buildApiMiddleware(
          () => "__BASE_URL__",
          authHeaderBuilder
        );
        const action = {
          type: "__TYPE__",
          meta: {
            request: {
              url: "__URL__",
              authenticated: false,
            },
          },
        };
        // ACT
        await apiMiddleware(store)(next)(action);
        // ASSERT
        expect(next).toHaveBeenCalledWith(action);
        expect(fetch).toHaveBeenCalled();
        const [url, init] = fetch.mock.calls[0];
        expect(init.headers["Authorization"]).toEqual(undefined);
        expect(authHeaderBuilder).not.toHaveBeenCalled();
      });
    });
  });
});
