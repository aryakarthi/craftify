import React from "react";

const ModalButton = ({
  label,
  disabled,
  small,
  outline,
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
    relative
    disabled:opacity-70
    disabled:cursor-not-allowed
    rounded-lg
    hover:opacity-80
    transition
    w-full
    ${outline ? "bg-white" : "bg-rose-500"}
    ${outline ? "border-black" : "border-rose-500"}
    ${outline ? "text-black" : "text-white"}
    ${small ? "text-sm" : "text-md"}
    ${small ? "py-1" : "py-3"}
    ${small ? "font-light" : "font-semibold"}
    ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {Icon && <Icon size={24} className="absolute left-0 top-0 text-white" />}
      {label}
    </button>
  );
};

export default ModalButton;
