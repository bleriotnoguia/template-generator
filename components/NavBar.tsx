import ModeToggle from "@/components/ModeToggle";
import {
  ComputerIcon,
  RedoIcon,
  SmartphoneIcon,
  TabletIcon,
  UndoIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <Button variant="outline">
          <UndoIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline">
          <RedoIcon className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline">
          <ComputerIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline">
          <TabletIcon className="w-4 h-4" />
        </Button>
        <Button variant="outline">
          <SmartphoneIcon className="w-4 h-4" />
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};

export default NavBar;
