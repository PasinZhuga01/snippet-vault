export interface SearchBarProps {
  q: string;
  tag: string;
  onQChange: (value: string) => void;
  onTagChange: (value: string) => void;
}