import { getBlockedUsers } from "@/lib/block-service";
import { columns, BlockedUser } from "./_components/columns";
import { DataTable } from "./_components/data-table";
import { format } from "date-fns";

async function getData(): Promise<BlockedUser[]> {
  const blockedUsers = await getBlockedUsers();

  return blockedUsers.map((blockUser) => ({
    ...blockUser.blocked,
    userId: blockUser.blocked.id,
    imageUrl: blockUser.blocked.imageUrl || "",
    username: blockUser.blocked.username,
    createdAt: format(new Date(blockUser.blocked.createdAt), "yyyy/MM/dd"),
  }));
}

const CommunityPage = async () => {
  const blockedUsers = await getData();
  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Community settings</h1>
      </div>
      <DataTable columns={columns} data={blockedUsers} />
    </div>
  );
};

export default CommunityPage;
