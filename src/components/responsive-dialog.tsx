import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function ResponsiveDialog({
  children,
  isOpen,
  setIsOpen,
  title,
  description,
  className,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description?: string;
  className?: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={`${className ?? "sm:max-w-[425px] "}`}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4">
              {title}
            </DialogTitle>
            {description && (
              <DialogDescription className=" ">{description}</DialogDescription>
            )}
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader className="text-center ">
          <DrawerTitle>{title}</DrawerTitle>
          {description && (
            <DialogDescription className="mb-3 text-center">
              {description}
            </DialogDescription>
          )}
        </DrawerHeader>
        {children}
        <DrawerFooter className="pt-2 mt-5"></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
