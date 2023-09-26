import { Response } from "express";

export const errorMessage = (word: string, message: string) => {
  const originalString = message;
  const wordToReplace = '"value"';
  const newWord = word;
  const regex = new RegExp(wordToReplace, "gi");
  return originalString.replace(regex, newWord);
};

export const apiResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data?: any,
) => {
  res.json({
    status: statusCode,
    message,
    data: data || [],
  });
};
