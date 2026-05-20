import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserCircle, Users } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 sm:p-24 relative overflow-hidden">


      <div className="z-10 w-full max-w-4xl flex flex-col items-center gap-12 text-center">
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight">
            <span className="text-primary">
              AccessGrid
            </span>{' '}
            v6
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The next-generation hackathon evaluation system. Seamlessly connect participants, guides, and evaluators in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
          <Link href="/participant" className="group">
            <Card className="h-full transition-all hover:scale-[1.02] cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                  <UserCircle className="w-10 h-10 text-primary" />
                </div>
                <CardTitle className="text-2xl">Participant Portal</CardTitle>
                <CardDescription className="text-base mt-2">
                  View your allocated room, team details, and submit required links.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button variant="ghost" className="group-hover:text-primary transition-colors">
                  Enter Portal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>

          <Link href="/evaluator" className="group">
            <Card className="h-full transition-all hover:scale-[1.02] cursor-pointer">
              <CardHeader className="text-center">
                <div className="mx-auto bg-ring/10 p-4 rounded-full w-fit mb-4 group-hover:bg-ring/20 transition-colors">
                  <Users className="w-10 h-10 text-ring" />
                </div>
                <CardTitle className="text-2xl">Evaluator Portal</CardTitle>
                <CardDescription className="text-base mt-2">
                  Select events, view assigned teams, and mark live attendance.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center pb-8">
                <Button variant="ghost" className="group-hover:text-ring transition-colors">
                  Enter Portal <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
