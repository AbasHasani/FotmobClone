import { TypedDocumentNode } from "@apollo/client";
import { clsx, type ClassValue } from "clsx";
import { ASTNode, print } from "graphql";
import request, { RequestDocument } from "graphql-request";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertUTCToLocalTime = (utcTime: any) => {
  const date = new Date(utcTime);
  const localDate: Date = new Date(
    date.getTime() + date.getTimezoneOffset() * 60 * 1000
  );
  const hour = localDate.getHours();
  const minute = localDate.getMinutes() == 0 ? "00" : localDate.getMinutes();
  return `${hour}:${minute}`;
};

export const truncateAfterSpace = (str: string, limit = 100) => {
  if (str.length <= limit) return str;

  // Find the last space within the limit
  const truncatedIndex = str.lastIndexOf(" ", limit);

  // If a space is found within the limit, truncate at that point; otherwise, use the full limit
  const cutOffIndex = truncatedIndex > -1 ? truncatedIndex : limit;

  return str.slice(0, cutOffIndex) + "...";
};

export const baseGoalImageUrl = `https://www.goal.com`;

export const fetchGraphql = async (query: ASTNode, variables?: any) => {
  const StringQuery = print(query);
  const res = await fetch(`https://fotmob-uvwm.onrender.com/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: StringQuery, variables }),
  });
  const data = await res.json();
  return data;
};

export const requestGraphql = async (
  document: RequestDocument | TypedDocumentNode<unknown, object>,
  variables?: any
) => {
  const data = await request({
    url: `https://fotmob-uvwm.onrender.com/graphql`,
    document,
    variables,
  });
  return data;
};

export function analyzeNumbers(a: number, b: number) {
  if (a + b === 100) {
    return { firstNumber: a, secondNumber: b };
  } else {
    const total = a + b;
    const percentA = (a / total) * 100;
    const percentB = (b / total) * 100;

    return {
      firstNumber: parseFloat(percentA.toFixed(2)),
      secondNumber: parseFloat(percentB.toFixed(2)),
    };
  }
}

export function getAdjacentDates(dateStr: string) {
  // Parse the date string (assuming format YYYY-MM-DD)
  const [year, month, day] = dateStr.split("-").map((num) => parseInt(num));

  // Create a Date object (subtract 1 from month since months are 0-based in JS)
  const date = new Date(year, month - 1, day);

  // Create yesterday by subtracting 1 day (86400000 milliseconds)
  const yesterday = new Date(date);
  yesterday.setDate(date.getDate() - 1);

  // Create tomorrow by adding 1 day
  const tomorrow = new Date(date);
  tomorrow.setDate(date.getDate() + 1);

  // Format dates back to strings
  const formatDate = (date: any) => {
    const y = date.getFullYear();
    // Add leading zeros for month and day
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return {
    yesterday: yesterday,
    date: dateStr,
    tomorrow: tomorrow,
  };
}
