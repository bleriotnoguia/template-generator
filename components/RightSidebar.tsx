import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react";

export default function RightSidebar() {
  return (
    <aside className="w-64 p-4">
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold">Image Block</h3>
        <img
          src="/placeholder.svg"
          alt="Image Block"
          className="w-full h-auto mb-4"
          width="200"
          height="100"
          style={{ aspectRatio: "200/100", objectFit: "cover" }}
        />
        <h3 className="mb-2 text-sm font-semibold">URL Image</h3>
        <Input placeholder="Enter URL" className="w-full mb-4" />
        <Button variant="default" className="bg-purple-600 w-full">
          Choose Image
        </Button>
      </div>
      <div className="mb-6 flex justify-between">
        <h3 className="mb-2 text-sm font-semibold">Auto Width</h3>
        <div className="flex items-center space-x-2 mb-4">
          <Switch id="auto-width" />
        </div>
      </div>
      <div className="mb-6 flex  justify-between">
        <Label htmlFor="auto-width" className="mr-2">
          80%
        </Label>
        <input type="range" className="w-full" />
      </div>
      <div className="mb-6">
        <h3 className="mb-2 text-sm font-semibold">Image Alignment</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <AlignLeftIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <AlignCenterIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <AlignRightIcon className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <AlignCenterIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold">Container Padding</h3>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <Label htmlFor="padding-top">Top</Label>
            <Input id="padding-top" placeholder="10" className="w-full" />
          </div>
          <div>
            <Label htmlFor="padding-right">Right</Label>
            <Input id="padding-right" placeholder="10" className="w-full" />
          </div>
          <div>
            <Label htmlFor="padding-bottom">Bottom</Label>
            <Input id="padding-bottom" placeholder="10" className="w-full" />
          </div>
          <div>
            <Label htmlFor="padding-left">Left</Label>
            <Input id="padding-left" placeholder="10" className="w-full" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hide-on-desktop" />
          <Label htmlFor="hide-on-desktop">Hide On Desktop</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="hide-on-mobile" />
          <Label htmlFor="hide-on-mobile">Hide On Mobile</Label>
        </div>
      </div>
    </aside>
  );
}
