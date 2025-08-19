import type { Metadata } from "next"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CreateJobForm } from "@/components/jobs/create-job-form"

export const metadata: Metadata = {
  title: "Post a Job - FreelanceHub",
  description: "Post your project and find the perfect freelancer",
}

export default function CreateJobPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a Job</h1>
          <p className="text-muted-foreground">Tell us about your project and find the perfect freelancer</p>
        </div>
        <CreateJobForm />
      </main>
      <Footer />
    </div>
  )
}
