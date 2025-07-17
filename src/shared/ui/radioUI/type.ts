export type RadioButtonUIProps = {
  label: string;
  value: any; // вот тут проблема типизации. 
  checked: boolean;
  onChange: (value: any) => void;
};
