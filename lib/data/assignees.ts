export interface Assignee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role?: string;
}

// Static assignees data - will eventually be fetched from the database
export const assignees: Assignee[] = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    avatar: "https://i.pravatar.cc/150?img=1",
    role: "Product Manager",
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@company.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Frontend Developer",
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@company.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "Backend Developer",
  },
  {
    id: "4",
    name: "David Brown",
    email: "david.brown@company.com",
    avatar: "https://i.pravatar.cc/150?img=8",
    role: "UX Designer",
  },
  {
    id: "5",
    name: "Eva Martinez",
    email: "eva.martinez@company.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Tech Lead",
  },
  {
    id: "6",
    name: "Frank Chen",
    email: "frank.chen@company.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "DevOps Engineer",
  },
  {
    id: "7",
    name: "Grace Kim",
    email: "grace.kim@company.com",
    avatar: "https://i.pravatar.cc/150?img=16",
    role: "QA Engineer",
  },
  {
    id: "8",
    name: "Henry Wilson",
    email: "henry.wilson@company.com",
    avatar: "https://i.pravatar.cc/150?img=12",
    role: "Full Stack Developer",
  },
  {
    id: "9",
    name: "Charlie Brown",
    email: "charlie.brown@company.com",
    avatar: "https://i.pravatar.cc/150?img=14",
    role: "Software Engineer",
  },
  {
    id: "10",
    name: "Diana Prince",
    email: "diana.prince@company.com",
    avatar: "https://i.pravatar.cc/150?img=20",
    role: "Project Manager",
  },
];

// Helper to get assignee by id
export function getAssigneeById(id: string): Assignee | undefined {
  return assignees.find((assignee) => assignee.id === id);
}

// Helper to get assignee by name
export function getAssigneeByName(name: string): Assignee | undefined {
  return assignees.find((assignee) => assignee.name === name);
}

// Get all assignee names (for backwards compatibility)
export function getAssigneeNames(): string[] {
  return assignees.map((assignee) => assignee.name);
}
