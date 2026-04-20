import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

const ButtonWithIconDemo = () => {
  return (
    <Button className="relative text-2xl font-semibold rounded-full h-20 p-1 ps-12 pe-24 group transition-all duration-500 hover:ps-24 hover:pe-12 w-fit overflow-hidden cursor-pointer">
      <span className="relative z-10 transition-all duration-500">
        Let's Collaborate
      </span>
      <div className="absolute right-2 w-16 h-16 bg-background text-foreground rounded-full flex items-center justify-center transition-all duration-500 group-hover:right-[calc(100%-64px)] group-hover:rotate-45">
        <ArrowUpRight size={28} />
      </div>
    </Button>
  );
};

export default ButtonWithIconDemo;
