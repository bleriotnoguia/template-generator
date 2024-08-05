import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";

export default function LeftSidebar() {
  return (
    <aside className="w-64 p-4 sticky top-0">
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-purple-600 rounded-full" />
        <div className="ml-3">
          <h2 className="text-md font-bold">Elux Space Marketing</h2>
          <p className="text-sm text-gray-400">Email Workspace</p>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="w-full text-xs mb-2">Search Elements</h3>
        <Input placeholder="Search types..." className="w-full" />
      </div>
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold">Layout</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            1 Column
          </Button>
          <Button variant="outline" className="w-full">
            2 Column
          </Button>
          <Button variant="outline" className="w-full">
            3 Column
          </Button>
          <Button variant="outline" className="w-full">
            4 Column
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Blocks</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full">
            Text
          </Button>
          <Button variant="outline" className="w-full">
            Image
          </Button>
          <Button variant="outline" className="w-full">
            Title
          </Button>
          <Button variant="outline" className="w-full">
            Divider
          </Button>
        </div>
      </div>
    </aside>
  );
}
