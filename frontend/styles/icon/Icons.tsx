import styled from "styled-components";
import { MdMessage } from "react-icons/md";
import { BsBellFill } from "react-icons/bs";
import {
  MdOutlineKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdClose,
  MdHistory,
} from "react-icons/md";
import { RiDashboardFill, RiGamepadFill } from "react-icons/ri";
import { TbHierarchy } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import { IoAlertCircle } from "react-icons/io5";
import {
  MdKeyboardArrowRight,
  MdKeyboardArrowLeft,
  MdLocationOn,
} from "react-icons/md";
import { BsFillEyeFill, BsEmojiSmileFill } from "react-icons/bs";
import { BiLeftArrowAlt } from "react-icons/bi";
import { BsImageFill, BsArrowRightShort, BsPerson } from "react-icons/bs";
import { IoMdMic } from "react-icons/io";
import { AiOutlineTransaction } from "react-icons/ai";
import { VscSignOut } from "react-icons/vsc";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { GoBell } from "react-icons/go";
import { SiDiscord } from "react-icons/si";

export const Menu = styled(HiOutlineMenuAlt2)`
  width: 1.6rem;
  height: 1.6rem;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const Message = styled(MdMessage)`
  width: 1.7rem;
  margin: 0 1rem;
  height: 1.8rem;
`;

export const Bell = styled(BsBellFill)`
  width: 1.6rem;
  height: 1.6rem;
  margin: 0 1rem;
`;
export const Bell2 = styled(GoBell)`
  width: 1.6rem;
  height: 1.6rem;
  @media screen and (min-width: 769px) {
    display: none;
  }
`;

export const ArrowDown = styled(MdOutlineKeyboardArrowDown)``;
export const ArrowUp = styled(MdKeyboardArrowUp)``;

export const OverViewIcon = styled(RiDashboardFill)`
  color: ${(props) => (props.color ? props.color : "#fff")};
  width: 1.5rem;
  height: 1.5rem;
`;

export const MobileOverViewIcon = styled(RiDashboardFill)`
  color: #01070e;
  width: 1.5rem;
  height: 1.5rem;
`;

export const TournamentIcon = styled(RiGamepadFill)`
  color: ${(props) => (props.color ? props.color : "#fff")};
  width: 1.5rem;
  height: 1.5rem;
`;

export const MobileTournamentIcon = styled(RiGamepadFill)`
  color: #01070e;
  width: 1.5rem;
  height: 1.5rem;
`;

export const GameIcon = styled(TbHierarchy)`
  color: #fff;
  width: 1.5rem;
  height: 1.5rem;
`;
export const MobileGameIcon = styled(TbHierarchy)`
  color: #01070e;
  width: 1.5rem;
  height: 1.5rem;
`;

export const Friends = styled(FaUserFriends)`
  color: #fff;
  width: 1.5rem;
  height: 1.5rem;
`;

export const MobileFriendsIcon = styled(FaUserFriends)`
  color: #01070e;
  width: 1.5rem;
  height: 1.5rem;
`;

export const NewsIcon = styled(IoAlertCircle)`
  color: #fff;
  width: 1.5rem;
  height: 1.5rem;
`;

export const MobileNewsIcon = styled(IoAlertCircle)`
  color: #01070e;
  width: 1.5rem;
  height: 1.5rem;
`;

export const RightArrow = styled(MdKeyboardArrowRight)`
  width: 1.5rem;
  height: 1.5rem;
  color: ${(props) => (props.color ? props.color : "#F8DBFB")};
`;

export const LeftArrow = styled(MdKeyboardArrowLeft)`
  color: #f6b8fc;
  width: 1.5rem;
  height: 1.5rem;
`;

export const Eye = styled(BsFillEyeFill)`
  color: #fff;
  width: 1rem;
  height: 1rem;
`;

export const LeftArrow2 = styled(BiLeftArrowAlt)`
  color: ${(props) => (props.color ? props.color : "#F8DBFB")};
  font-size: 1.5rem;
`;

export const Mic = styled(IoMdMic)`
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const Location = styled(MdLocationOn)`
  color: #ffffff;
  font-size: 1.2rem;
  margin: 0 0.7rem;
  cursor: pointer;
`;

export const Image = styled(BsImageFill)`
  color: #ffffff;
  font-size: 1.1rem;
  margin: 0 0.7rem;
  cursor: pointer;
`;

export const Emoji = styled(BsEmojiSmileFill)`
  color: #ffffff;
  font-size: 1.1rem;
  margin: 0 0.7rem;
  cursor: pointer;
`;
export const Close = styled(MdClose)`
  color: #f04438;
  font-size: 1.5rem;
  cursor: pointer;
`;
export const Person = styled(BsPerson)`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-size: 2rem;
  cursor: pointer;
`;
export const History = styled(MdHistory)`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-size: 2rem;
  cursor: pointer;
`;
export const Transaction = styled(AiOutlineTransaction)`
  color: ${(props) => (props.color ? props.color : "#fff")};
  font-size: 2rem;
  cursor: pointer;
`;

export const RightArrow2 = styled(BsArrowRightShort)`
  color: ${(props) => (props.color ? props.color : "#ffffff")};
  font-size: 1.5rem;
  cursor: pointer;
`;
export const SignOut = styled(VscSignOut)`
  color: ${(props) => (props.color ? props.color : "#F97066")};
  font-size: 1.5rem;
  cursor: pointer;
`;
export const Discord = styled(SiDiscord)`
  color: ${(props) => (props.color ? props.color : "#ffffff58")};
  font-size: ${(props) => (props.fontSize ? props.fontSize : "16px")};
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;
