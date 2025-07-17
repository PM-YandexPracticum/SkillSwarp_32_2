export type RadioButtonUIProps = {
  label: string;
  value: string; // вот тут проблема типизации. 
  checked: boolean;
  onChange: (value: any) => void;
};
