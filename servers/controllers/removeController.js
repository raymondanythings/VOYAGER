import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydiary } from "../models/myDiary";
import { mydaily } from "../models/myDaily";
import { refresh } from "../models/refreshToken";

export const deleteMyDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = new Date(req.body.date);
    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx !== -1) {
      data.splice(idx, 1);
      user.data = data;
      console.log(user.data);
      user.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "MyDiary 삭제 실패" });
  }
};

export const dropOut = async (req, res) => {
  try {
    const snsId = req.snsId;
    const message = req.body.message;
    if (message === "제 흔적을 지우고 지구로 돌아가겠습니다. VOYAGER 안녕.") {
      res.clearCookie("Authorization");
      res.clearCookie("reAuthorization");
      await mydiary.findOneAndDelete({ snsId });
      await mydaily.findOneAndDelete({ snsId });
      await mycolor.findOneAndDelete({ snsId });
      await mycalendar.findOneAndDelete({ snsId });
      await User.findOneAndDelete({ snsId });
      await refresh.findOneAndDelete({ snsId });
      console.log("탈퇴 성공 ㅠㅠ");
      return res
        .status(200)
        .json({ success: true, message: " 회원탈퇴 성공ㅠㅠ" });
    }
    return res
      .status(400)
      .status.json({ success: false, message: "회원탈퇴 실패 " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "error로 회원탈퇴 실패" });
  }
};
