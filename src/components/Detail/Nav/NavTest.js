import React, { useCallback, useState } from "react";
import classes from "./NavTest.module.scss";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import NavTestBtn from "./NavTestBtn";
import { useNavigate } from "react-router";

const NavTest = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className={classes.navbar__Items}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          textDecorationLine: "none",
          underline: "none",
          color: "#5ddae9",
          cursor: "pointer",
        }}
        onClick={() => {
          window.location.href = "#page-1";
          setTimeout(() => navigate("/"), 200);
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/image/logo2.png`}
          alt="logo"
          className={classes.navbar__logo}
        />
        <span>VOYAGER</span>
      </div>

      <ul
        className={
          clicked
            ? `${classes.navbar__menu} ${classes.active}`
            : `${classes.navbar__menu}`
        }
      >
        {MenuItems.map((m, idx) =>
          m.title !== "SIGN UP" ? (
            <li key={idx}>
              <a className={classes[m.cName]} href={m.url}>
                {m.title}
              </a>
            </li>
          ) : (
            <li key={idx}>
              <Link
                className={
                  clicked
                    ? `${classes[m.cName]} ${classes.active}`
                    : classes[m.cName]
                }
                to={m.url}
              >
                {m.title}
              </Link>
            </li>
          )
        )}
      </ul>
      <NavTestBtn
        onClick={() => {
          window.location.href = "#page-1";
          setTimeout(() => navigate("login"), 200);
        }}
      >
        LOG IN
      </NavTestBtn>
    </nav>
  );
};

export default NavTest;