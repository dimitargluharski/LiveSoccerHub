import * as Switch from "@radix-ui/react-switch";
import { IoSunny, IoMoon } from "react-icons/io5"; // Импортиране на иконите

type SwitchButtonTypes = {
  theme: string;
  toggleTheme: () => void;
};

export const SwitchButton = ({ theme, toggleTheme }: SwitchButtonTypes) => (
  <div className="flex items-center gap-4">
    <IoSunny
      className={`w-5 h-5 transition-opacity duration-200 ${theme === "light" ? "text-yellow-500 opacity-100" : "text-gray-400 opacity-50"
        }`}
    />

    <Switch.Root
      className={`relative h-[25px] w-[50px] cursor-pointer rounded-full ${theme === "light" ? "bg-gray-300" : "bg-gray-700"
        } shadow-none outline-none focus:shadow-none`}
      id="theme-switch"
      checked={theme === "dark"}
      onCheckedChange={toggleTheme}
    >
      <Switch.Thumb
        className={`block h-[21px] w-[21px] rounded-full bg-white shadow-none transition-transform duration-100 ${theme === "dark" ? "translate-x-[25px]" : "translate-x-0.5"
          }`}
      />
    </Switch.Root>

    <IoMoon
      className={`w-5 h-5 transition-opacity duration-200 ${theme === "dark" ? "text-yellow-500 opacity-100" : "text-gray-400 opacity-50"
        }`}
    />
  </div>
);