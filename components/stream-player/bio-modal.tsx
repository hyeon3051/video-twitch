"use client";

import { useState, useTransition, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
interface BioModalProps {
  initialBio: string | null;
}
export const BioModal = ({ initialBio }: BioModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [bio, setBio] = useState(initialBio);
  const [isPending, startTransition] = useTransition();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      updateUser({ bio })
        .then(() => {
          toast.success("Bio updated");
          closeRef.current?.click();
        })
        .catch((error) => {
          toast.error("Failed to update bio");
        });
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="user bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio || ""}
          />
          <div className="flex justify-between">
            <Button type="submit">Save</Button>
            <DialogClose asChild ref={closeRef}>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
