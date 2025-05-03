import { db } from "./client";
import { projects } from "./schema";

async function seed() {
  try {
    // Clear existing projects
    await db.delete(projects);

    // Insert sample projects
    const sampleProjects = [
      {
        name: "Website Redesign",
        description: "Complete overhaul of the company website with modern design principles",
        status: "active",
      },
      {
        name: "Mobile App Development",
        description: "Building a cross-platform mobile application for iOS and Android",
        status: "active",
      },
      {
        name: "Database Migration",
        description: "Migrating legacy database to a new cloud-based solution",
        status: "completed",
      },
      {
        name: "API Integration",
        description: "Integrating third-party APIs for payment processing",
        status: "active",
      },
      {
        name: "Security Audit",
        description: "Comprehensive security review and vulnerability assessment",
        status: "archived",
      },
    ];

    for (const project of sampleProjects) {
      await db.insert(projects).values(project);
    }

    console.log("✅ Seed completed successfully");
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed(); 