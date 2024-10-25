import * as React from "react"

export function Tabs({ defaultValue, className, children }: {
  defaultValue?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className={`w-full ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { 
            value, 
            onChange: setValue 
          })
        }
        return child
      })}
    </div>
  )
}

interface TabsListProps {
  className?: string;
  children: React.ReactNode;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
  onChange?: (value: string) => void;
}

interface TabsContentProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

Tabs.List = function TabsList({ className, children }: TabsListProps) {
  return (
    <div className={`flex space-x-1 rounded-lg bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  )
}

Tabs.Trigger = function TabsTrigger({ value, className, children, onChange }: TabsTriggerProps) {
  return (
    <button
      className={`px-3 py-1.5 text-sm font-medium transition-all hover:bg-white hover:text-gray-900 rounded-md ${
        value ? "bg-white text-gray-900 shadow-sm" : "text-gray-600"
      } ${className}`}
      onClick={() => onChange?.(value)}
    >
      {children}
    </button>
  )
}

Tabs.Content = function TabsContent({ value, className, children }: TabsContentProps) {
  return (
    <div className={`mt-2 ${className}`}>
      {children}
    </div>
  )
}