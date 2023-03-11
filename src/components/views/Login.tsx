import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createLoginRequest } from "../../redux/user/actions";
import Inpt from "../atoms/Inpt";
import Btn from "../atoms/Btn";
import ExternalLink from "../atoms/ExternalLink";
import Spinner from "../atoms/Spinner";
import Header from "../atoms/Header";
import { selectLoginPending } from "../../redux/user/selectors";

const Login = () => {
  const [email_address, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoginPending);

  const login = () => {
    dispatch(createLoginRequest({}));
  };

  return (
    <div className="px-8 py-6">
      <Header />
      <div className="mb-4">
        <Inpt
          placeholder="Email address"
          disabled={isLoading}
          value={email_address}
          onChange={setEmailAddress}
        />
      </div>
      <div className="mb-4">
        <Inpt
          placeholder="Password"
          disabled={isLoading}
          type="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Btn
            disabled={isLoading || !email_address || !password}
            onClick={login}
          >
            Login
          </Btn>
          {isLoading && (
            <div className="ml-4">
              <Spinner />
            </div>
          )}
        </div>
        <div>
          <ExternalLink target="_blank" href="https://www.google.com">
            Don't have an account?
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
