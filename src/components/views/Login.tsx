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
  const [email, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoginPending);

  const login = () => {
    dispatch(createLoginRequest({ email, password }));
  };

  return (
    <div className="px-8 py-6">
      <Header />
      <div className="mb-4">
        <Inpt
          placeholder="Email address"
          disabled={isLoading}
          value={email}
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
          <Btn disabled={isLoading || !email || !password} onClick={login}>
            Login
          </Btn>
          {isLoading && (
            <div className="ml-4">
              <Spinner />
            </div>
          )}
        </div>
        <div>
          <ExternalLink
            target="_blank"
            href={`${process.env.REACT_APP_BACKEND_URL}/accounts/signup`}
          >
            Don't have an account?
          </ExternalLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
