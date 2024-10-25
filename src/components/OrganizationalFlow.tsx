import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { Slider } from "./ui/slider";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./ui/tabs";


interface DataPoint {
  input: number;
  raw: number;
  departmental: number;
  organizational: number;
  executive: number;
}

interface StructureFunctions {
  raw: (x: number, complexity: number) => number;
  departmental: (x: number, intensity: number) => number;
  organizational: (x: number, complexity: number) => number;
  executive: (x: number, intensity: number) => number;
}

const OrganizationalFlow: React.FC = () => {
  const [dynamicsIntensity, setDynamicsIntensity] = useState<number>(0);

  // Structure A: High-Constraint Architecture
  const structureAFunctions: StructureFunctions = {
    raw: (x: number, complexity: number): number => {
      const sigmoid = 1 / (1 + Math.exp(-x + complexity));
      return x * sigmoid + 2;
    },
    departmental: (x: number, intensity: number): number => {
      const threshold = 2 * intensity;
      return x > threshold ? x - threshold : 0;
    },
    organizational: (x: number, complexity: number): number => {
      const normalized = Math.min(Math.max(x / (10 - complexity), 0), 1);
      return (normalized * normalized * (3 - 2 * normalized) * 8) + 4;
    },
    executive: (x: number, intensity: number): number => {
      const compression = 1 - intensity * 0.5;
      return ((6 * compression) / (1 + Math.exp(-x + 3))) + 6;
    }
  };

  // Structure B: Adaptive Architecture
  const structureBFunctions: StructureFunctions = {
    raw: (x: number, complexity: number): number => {
      const sigmoid = 1 / (1 + Math.exp(-x + complexity * 0.8));
      return x * sigmoid + 3;
    },
    departmental: (x: number, intensity: number): number => {
      const threshold = 1.5 * intensity;
      return x > threshold ? x - threshold * 0.8 : 0;
    },
    organizational: (x: number, complexity: number): number => {
      const normalized = Math.min(Math.max(x / (10 - complexity * 0.7), 0), 1);
      return (normalized * normalized * (3.5 - 2 * normalized) * 8) + 4;
    },
    executive: (x: number, intensity: number): number => {
      const compression = 1 - intensity * 0.3;
      return ((7 * compression) / (1 + Math.exp(-x + 2))) + 6;
    }
  };

  const generateData = (functions: StructureFunctions): DataPoint[] => {
    const data: DataPoint[] = [];
    for(let x = 0; x <= 10; x += 0.25) {
      data.push({
        input: x,
        raw: functions.raw(x, dynamicsIntensity * 2),
        departmental: functions.departmental(x, dynamicsIntensity),
        organizational: functions.organizational(x, dynamicsIntensity * 5),
        executive: functions.executive(x, dynamicsIntensity)
      });
    }
    return data;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">
          Neural Networks Through Organizational Flow
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Visualizing how information flows through organizational structures
          can help us understand neural network behavior
        </p>

        <Card className="w-full">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-900">
              Information Flow Architecture Analysis
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Visualizing organizational dynamics and information processing patterns
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8 pt-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Organizational Dynamics Intensity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-grow">
                    <Slider
                      value={[dynamicsIntensity * 100]}
                      max={100}
                      step={1}
                      onValueChange={([value]: number[]) => setDynamicsIntensity(value / 100)}
                      className="w-full"
                    />
                  </div>
                  <span className="font-mono w-16 text-right">
                    {(dynamicsIntensity * 100).toFixed(0)}%
                  </span>
                </div>
              </div>

              <Tabs defaultValue="comparative" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="comparative">Comparative View</TabsTrigger>
                  <TabsTrigger value="structureA">High-Constraint</TabsTrigger>
                  <TabsTrigger value="structureB">Adaptive</TabsTrigger>
                </TabsList>

                <TabsContent value="comparative">
                  <div className="bg-white rounded-lg">
                    <LineChart
                      width={900}
                      height={500}
                      margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        label={{ value: "Input Signal Magnitude", position: "bottom", offset: 20 }}
                        domain={[0, 10]}
                      />
                      <YAxis 
                        label={{ value: "Transform Output", angle: -90, position: "insideLeft", offset: -40 }}
                        domain={[0, 16]}
                      />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      
                      <Line 
                        data={generateData(structureAFunctions)}
                        type="monotone" 
                        dataKey="executive" 
                        stroke="#ef4444" 
                        name="High-Constraint"
                        strokeWidth={3}
                        dot={false}
                      />
                      
                      <Line 
                        data={generateData(structureBFunctions)}
                        type="monotone" 
                        dataKey="executive" 
                        stroke="#22c55e" 
                        name="Adaptive"
                        strokeWidth={3}
                        dot={false}
                      />
                    </LineChart>
                  </div>
                </TabsContent>

                <TabsContent value="structureA">
                  <div className="bg-white rounded-lg">
                    <LineChart
                      width={900}
                      height={500}
                      data={generateData(structureAFunctions)}
                      margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="input" 
                        label={{ value: "Input Signal", position: "bottom", offset: 20 }}
                      />
                      <YAxis 
                        label={{ value: "Transform Output", angle: -90, position: "insideLeft", offset: -40 }}
                        domain={[0, 16]}
                      />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="raw" stroke="#22c55e" name="Raw Data" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="departmental" stroke="#ef4444" name="Departmental" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="organizational" stroke="#6366f1" name="Organizational" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="executive" stroke="#f59e0b" name="Executive" strokeWidth={3} dot={false} />
                    </LineChart>
                  </div>
                </TabsContent>

                <TabsContent value="structureB">
                  <div className="bg-white rounded-lg">
                    <LineChart
                      width={900}
                      height={500}
                      data={generateData(structureBFunctions)}
                      margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                      <XAxis 
                        dataKey="input" 
                        label={{ value: "Input Signal", position: "bottom", offset: 20 }}
                      />
                      <YAxis 
                        label={{ value: "Transform Output", angle: -90, position: "insideLeft", offset: -40 }}
                        domain={[0, 16]}
                      />
                      <Tooltip />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="raw" stroke="#22c55e" name="Raw Data" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="departmental" stroke="#ef4444" name="Departmental" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="organizational" stroke="#6366f1" name="Organizational" strokeWidth={3} dot={false} />
                      <Line type="monotone" dataKey="executive" stroke="#f59e0b" name="Executive" strokeWidth={3} dot={false} />
                    </LineChart>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">High-Constraint Architecture</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Structured departmental filtering with formal boundaries</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Strong hierarchical decision compression</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Clear organizational constraints and protocols</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Sequential information processing pipeline</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Adaptive Architecture</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Flexible departmental boundaries with dynamic adjustments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Multiple decision pathways with feedback loops</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Responsive organizational structure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-medium">•</span>
                    <span>Parallel information processing capabilities</span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OrganizationalFlow;