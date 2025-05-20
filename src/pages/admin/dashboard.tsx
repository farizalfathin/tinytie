import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, LucideIcon, Image } from "lucide-react";
import RenderList from "@/components/others/RenderList";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Data {
  text: string;
  count: number;
  Icon: LucideIcon;
}

const defaultData: Data[] = [
  {
    text: "Total Users",
    count: 0,
    Icon: Users,
  },
  {
    text: "Total Posts",
    count: 0,
    Icon: Image,
  },
];

export default function Dashboard() {
  const [data, setData] = useState<Data[]>(defaultData);

  const fetchData = async () => {
    try {
      const [users, posts] = await Promise.all([
        supabase.from("users").select("*", { count: "exact" }),
        supabase.from("posts").select("*", { count: "exact" }),
      ]);

      if (posts.error || users.error) {
        throw new Error(`
          error fetch posts: ${posts.error}\n
          error fetch users: ${users.error}
        `);
      }

      setData((prev) => [
        {
          ...prev[0],
          count: users.data.length,
        },
        {
          ...prev[1],
          count: posts.data.length,
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard Overview</h1>
        <Card>
          <CardHeader>
            <CardTitle className="font-semibold text-2xl">
              Welcome Admin!
            </CardTitle>
            <CardDescription>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla,
              animi.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-4 gap-4">
            <RenderList
              of={data}
              render={(item: Data, index) => <DataCard key={index} {...item} />}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DataCard({ text, count, Icon }: Data) {
  return (
    <div className="p-4 border border-border rounded-xl shadow">
      <Icon />
      <span>{text}</span>
      <h3 className="text-5xl font-medium text-secondary-foreground text-start">
        {count}
      </h3>
    </div>
  );
}
