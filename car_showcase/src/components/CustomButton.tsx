"use client";
import React from "react";
import Image from "next/image";
import { CustomButtonProps } from "@/types";
type Props = {};

const CustomButton = ({
  title,
  containerStyles,
  handleClick,
  btnType,
  textStyle,
  rightIcon,
  isDisabled,
}: CustomButtonProps) => {
  return (
    <button
      type={btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
      disabled={false}
    >
      <span className={`flex-1 ${textStyle}`}>{title}</span>

      {rightIcon && (
        <div className="relative w-6 h-6">
          <Image
            src={rightIcon}
            alt="rightIcon"
            fill
            className="object-contain"
          />
        </div>
      )}
    </button>
  );
};

export default CustomButton;
