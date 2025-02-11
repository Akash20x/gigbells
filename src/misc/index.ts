import { emojiMap } from "./constant";
import { AxiosError } from "axios";


export function getRGBA(color: string, opacity: number) {
    const hexToRGB = (hex: string) => {
      const bigint = parseInt(hex.slice(1), 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255,
      };
    };
  
    const { r, g, b } = hexToRGB(color);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`; // Convert opacity to a 0-1 scale
}
  




export const getSkillEmoji = (skill: string) => {
  const lowerSkill = skill.toLowerCase();

  if (emojiMap[lowerSkill as keyof typeof emojiMap]) {
    return emojiMap[lowerSkill as keyof typeof emojiMap];
  }

  const sortedKeys = Object.keys(emojiMap).sort((a, b) => b.length - a.length);
  const match = sortedKeys.find((key) => lowerSkill.includes(key));

  return emojiMap[match as keyof typeof emojiMap] || emojiMap.default;
};



export const isContentEmpty = (html: string) => {
  if (!html) return true; // Null or undefined
  const text = html.replace(/<[^>]+>/g, '').trim(); // Remove all HTML tags and trim whitespace
  return text.length === 0;
};    



export const isValidURL = (url: string) => {
  const regex = /^(ftp|http|https):\/\/[^ "]+$/;
  return regex.test(url);
};  



export const handleAxiosError = (error: unknown) => {
  const axiosError = error as AxiosError;

  if (axiosError.response) {
    return axiosError.response.data;
  }

  return { message: "An unknown error occurred" };
};