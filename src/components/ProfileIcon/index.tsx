import { useEffect, useState, useRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

type ProfileIconProps = {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileIcon: React.FC<ProfileIconProps> = ({ setMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // This is for closing the menu when clicking anywhere outside of this component
  const dropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const itemVariants: Variants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  };

  const menuVariants: Variants = {
    open: {
      clipPath: "inset(0% 0% 0% 0% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.7,
        delayChildren: 0.3,
        staggerChildren: 0.05,
      },
    },
    closed: {
      clipPath: "inset(10% 50% 90% 50% round 10px)",
      transition: {
        type: "spring",
        bounce: 0,
        duration: 0.3,
      },
    },
  };

  const closeSubMenus = () => {
    setIsOpen(false);
    setMenuOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className="relative text-darkblack flex justify-between items-center ml-2 text-[#ede0d4]"
    >
      <button onClick={toggleDropdown} className="flex items-center">
        <FaRegUserCircle />
        {isOpen ? <FaCaretUp className="ms-[3px]" /> : <FaCaretDown className="ms-[3px]" />}
      </button>
      <motion.div
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="absolute top-[34px] left-[0] md:left-[-53px] bg-[#ddb892] md:bg-[#e6ccb2] w-[100px] md:rounded-b-lg px-2 pb-1 pt-2 z-[-1]"
      >
        <motion.ul>
          <motion.li
            variants={itemVariants}
            className="px-1 py-[4px] flex items-center gap-1 text-[#b08968] hover:bg-[#b08968] hover:text-white md:rounded-lg cursor-pointer"
          >
            <Link href="/profile" legacyBehavior>
              <a onClick={() => closeSubMenus()} className="text-[14px] w-full">
                Profile
              </a>
            </Link>
          </motion.li>
          <motion.li
            variants={itemVariants}
            className="px-1 py-[4px] flex items-center gap-1 text-[#b08968] hover:bg-[#b08968] hover:text-white rounded-lg cursor-pointer"
          >
            <Link href="/favorite" legacyBehavior>
              <a onClick={() => closeSubMenus()} className="text-[14px] w-full">
                Favorites
              </a>
            </Link>
          </motion.li>
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default ProfileIcon;
