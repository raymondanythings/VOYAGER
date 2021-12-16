import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDailyQs, postDailyQs } from "../../redux/reducer/DailyQsReducer";
import { getCalendar } from "../../redux/reducer/CalendarReducer";
import styles from "./Detail.module.scss";
import Pal from "./Pal";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Sec = styled.div`
  position: relative;
  padding: 100px;
  background: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Moon = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  mix-blend-mode: screen;
  background-color: ${(props) => props.color};
`;

function Detail() {
  const stars = useRef();
  const moon = useRef();
  const mountains_behind = useRef();
  const mountains_front = useRef();
  const btn = useRef();
  const [testOpen, setTestOpen] = useState(false);
  const [fetch, setFetch] = useState(false);

  const dispatch = useDispatch();

  const postDailyQsData = useSelector((state) => {
    const { answer, id } = state.dailyQuestions;
    const data = { question: { _id: id }, answer };
    return data;
  });

  const getColor = useSelector(
    (state) => state.Calendar.Calendar?.color?.data[0]
  );

  const data = useCallback(async () => {
    const qs = dispatch(getDailyQs());
    return qs;
  }, [dispatch]);

  const scrollEvent = useCallback(() => {
    let value = window.scrollY;
    try {
      stars.current.style.left = value * 0.25 + "px";
      moon.current.style.top = value * 1 + "px";
      mountains_behind.current.style.top = value * 0.5 + "px";
      mountains_front.current.style.top = value * 0 + "px";
      btn.current.style.marginTop = value * 1.5 + "px";
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    dispatch(getCalendar());
    data();
    if (fetch) {
      console.log(postDailyQsData);
      dispatch(postDailyQs(postDailyQsData));
      setFetch(false);
    }

    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [data, dispatch]);
  return (
    <>
      <section className={styles.mainSection}>
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/stars.png"}
          id={styles["stars"]}
          alt="stars"
          ref={stars}
        />
        <Moon
          src={process.env.PUBLIC_URL + "/image/parallax/moon_fix.png"}
          // id={styles["moon"]}
          alt="moon"
          // style={{ backgroundColor: "red" }}
          color={getColor ? getColor.color : "transparent"}
          ref={moon}
        />
        <img
          src={
            process.env.PUBLIC_URL + "/image/parallax/mountains_behind11.png"
          }
          id={styles["mountains_behind"]}
          alt="mountains_behind"
          ref={mountains_behind}
        />

        <Link to="/dailyQuestion" id={styles["btn"]} ref={btn}>
          Explore
        </Link>
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/mountains_behind2.png"}
          id={styles["mountains_front"]}
          alt="mountains_front"
          ref={mountains_front}
        />
      </section>
      <Sec className={styles.sec} id="sec" color={"#0b787f"}>
        {testOpen ? (
          <Pal toggle={setTestOpen} fetch={fetch} setFetch={setFetch} />
        ) : (
          <button onClick={() => setTestOpen(true)}>OPEN SURVEY</button>
        )}
      </Sec>
    </>
    // </div>
  );
}

export default Detail;