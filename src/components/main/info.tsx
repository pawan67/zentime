import { Brain, Clock, Coffee, Target, Zap, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Info = () => {
  const benefits = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "Enhanced Focus",
      description:
        "25-minute focused work sessions help maintain concentration and reduce mental fatigue.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Better Time Management",
      description:
        "Break down work into manageable intervals, making large tasks less overwhelming.",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Regular Breaks",
      description:
        "Short breaks between sessions help maintain energy and prevent burnout.",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clear Goals",
      description:
        "Each pomodoro is a commitment to a specific task, improving goal clarity.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Increased Productivity",
      description:
        "Regular breaks and focused work periods lead to higher quality output.",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Progress Tracking",
      description:
        "Track completed pomodoros to measure productivity and improve time estimates.",
    },
  ];

  const stats = [
    { value: "25%", label: "More Productive" },
    { value: "40%", label: "Less Distracted" },
    { value: "60%", label: "Better Focus" },
    { value: "85%", label: "Task Completion" },
  ];

  return (
    <div className="space-y-8 py-8">
      <div className=" space-y-4">
        <h2 className="text-3xl font-bold">The Power of Pomodoro</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The Pomodoro Technique is a time management method developed by
          Francesco Cirillo in the late 1980s. It uses a timer to break work
          into intervals, traditionally 25 minutes in length, separated by short
          breaks.
        </p>
      </div>

      <div className="grid grid-cols-2  gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1   gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center space-x-2">
                {benefit.icon}
                <CardTitle className="text-lg">{benefit.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{benefit.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-muted/50 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-semibold">
          How to Use the Pomodoro Technique
        </h3>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Choose a task you want to work on</li>
          <li>Set the timer for 25 minutes (one pomodoro)</li>
          <li>Work on the task until the timer rings</li>
          <li>Take a short 5-minute break</li>
          <li>After four pomodoros, take a longer 15-30 minute break</li>
        </ol>
      </div>

      <div className=" space-y-4">
        <h3 className="text-xl font-semibold">Why It Works</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The Pomodoro Technique works because it helps you work with time, not
          against it. By breaking work into focused intervals, you can maintain
          high levels of concentration while preventing burnout. The regular
          breaks help your brain process information and maintain energy
          throughout the day.
        </p>
      </div>
    </div>
  );
};

export default Info;
