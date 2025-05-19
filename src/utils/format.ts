import { format } from "date-fns";
import { id } from "date-fns/locale";

export const formatDate = (data: Date | string): string =>
  format(data, "HH:mm EEEE, d MMMM yyyy", { locale: id });

export const formatTime = (data: Date | string): string =>
  format(data, "HH:mm", { locale: id });

export const slicingText = (text: string, maxLength: number): string =>
  text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
