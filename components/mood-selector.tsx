import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smile, Zap, Brain } from "lucide-react"

interface MoodSelectorProps {
  activeMood?: string
}

export default function MoodSelector({ activeMood }: MoodSelectorProps) {
  const moods = [
    {
      id: "feel-good",
      name: "Feel Good",
      icon: <Smile className="mr-2 h-4 w-4" />,
      description: "Uplifting and heartwarming movies",
    },
    {
      id: "action-fix",
      name: "Action Fix",
      icon: <Zap className="mr-2 h-4 w-4" />,
      description: "Thrilling and exciting adventures",
    },
    {
      id: "mind-benders",
      name: "Mind Benders",
      icon: <Brain className="mr-2 h-4 w-4" />,
      description: "Thought-provoking and complex stories",
    },
  ]

  return (
    <section>
      <h2 className="text-3xl font-bold text-center mb-4">I'm in the mood for...</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {moods.map((mood) => (
          <Link key={mood.id} href={`/?mood=${mood.id}`} className="w-full hover:text-primary">
            <Button
              variant={activeMood === mood.id ? "default" : "outline"}
              className="w-full h-auto py-6 flex flex-col items-center justify-center gap-2 cursor-pointer"
            >
              <div className="flex items-center">
                {mood.icon}
                <span>{mood.name}</span>
              </div>
              <p className="text-xs font-normal text-muted-foreground mt-1">{mood.description}</p>
            </Button>
          </Link>
        ))}
      </div>
    </section>
  )
}
