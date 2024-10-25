
declare module "@/components/ui/card" {
  export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>>;
  export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>>;
}

declare module "@/components/ui/slider" {
  interface SliderProps {
    value: number[];
    max: number;
    step: number;
    onValueChange: (value: number[]) => void;
    className?: string;
  }
  export const Slider: React.FC<SliderProps>;
}

declare module "@/components/ui/tabs" {
  interface TabsProps {
    defaultValue: string;
    className?: string;
  }
  export const Tabs: React.FC<TabsProps>;
  export const TabsList: React.FC<React.HTMLAttributes<HTMLDivElement>>;
  export const TabsTrigger: React.FC<{ value: string } & React.HTMLAttributes<HTMLButtonElement>>;
  export const TabsContent: React.FC<{ value: string } & React.HTMLAttributes<HTMLDivElement>>;
}
