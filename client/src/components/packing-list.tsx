import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Plus, Package, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import type { PackingItem, User as UserType } from "@shared/schema";

interface PackingListProps {
  tripId: number;
}

type PackingListItem = PackingItem & {
  user: UserType;
  groupStatus?: { checkedCount: number; memberCount: number };
};
type PackingListData = PackingListItem[];

const categories = [
  { value: "general", label: "General" },
  { value: "clothing", label: "Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "toiletries", label: "Toiletries" },
  { value: "documents", label: "Documents" },
  { value: "medication", label: "Medication" },
  { value: "food", label: "Food & Snacks" },
  { value: "activities", label: "Activities" },
];

export function PackingList({ tripId }: PackingListProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const packingQueryKey = [`/api/trips/${tripId}/packing`] as const;

  const [newItem, setNewItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [selectedItemType, setSelectedItemType] = useState<"personal" | "group">("personal");
  const [hideCompleted, setHideCompleted] = useState(false);

  const { data: packingItems = [], isLoading } = useQuery<PackingListData>({
    queryKey: packingQueryKey,
    retry: false,
  });

  const addItemMutation = useMutation({
    mutationFn: async (data: { item: string; category: string; itemType: "personal" | "group" }) => {
      await apiRequest(`/api/trips/${tripId}/packing`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packingQueryKey });
      setNewItem("");
      toast({
        title: "Item added",
        description: "The packing item has been added to your list.",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => { window.location.href = "/login"; }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to add packing item. Please try again.",
        variant: "destructive",
      });
    },
  });

  const togglePersonalItemMutation = useMutation({
    mutationFn: async (itemId: number) => {
      await apiRequest(`/api/packing/${itemId}/toggle`, { method: "PATCH" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packingQueryKey });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => { window.location.href = "/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "Failed to update item.", variant: "destructive" });
    },
  });

  const updateGroupItemStatusMutation = useMutation<
    PackingListItem,
    Error,
    { itemId: number; handled: boolean },
    { previousItems?: PackingListData }
  >({
    mutationFn: async ({ itemId, handled }) => {
      const method = handled ? "POST" : "DELETE";
      const res = await apiRequest(
        `/api/trips/${tripId}/packing/group-items/${itemId}/handled`,
        { method },
      );
      return (await res.json()) as PackingListItem;
    },
    onMutate: async ({ itemId, handled }) => {
      await queryClient.cancelQueries({ queryKey: packingQueryKey });
      const previousItems = queryClient.getQueryData<PackingListData>(packingQueryKey);
      if (previousItems) {
        const updatedItems = previousItems.map((item) => {
          if (item.id !== itemId || item.itemType !== "group") return item;
          const delta = handled === item.isChecked ? 0 : handled ? 1 : -1;
          return {
            ...item,
            isChecked: handled,
            groupStatus: item.groupStatus
              ? {
                  ...item.groupStatus,
                  checkedCount: Math.max(0, Math.min(item.groupStatus.memberCount, (item.groupStatus.checkedCount ?? 0) + delta)),
                }
              : item.groupStatus,
          };
        });
        queryClient.setQueryData<PackingListData>(packingQueryKey, updatedItems);
      }
      return { previousItems };
    },
    onError: (error, _vars, context) => {
      if (context?.previousItems) {
        queryClient.setQueryData<PackingListData>(packingQueryKey, context.previousItems);
      }
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => { window.location.href = "/login"; }, 500);
        return;
      }
      toast({ title: "Status not updated", description: "Couldn't update your status.", variant: "destructive" });
    },
    onSuccess: (updatedItem) => {
      queryClient.setQueryData<PackingListData>(packingQueryKey, (current) => {
        if (!current) return current;
        return current.map((item) => (item.id === updatedItem.id ? updatedItem : item));
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: packingQueryKey });
    },
  });

  const deleteItemMutation = useMutation({
    mutationFn: async (itemId: number) => {
      await apiRequest(`/api/packing/${itemId}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: packingQueryKey });
      toast({ title: "Item removed", description: "The packing item has been removed." });
    },
    onError: (error) => {
      if (isUnauthorizedError(error as Error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => { window.location.href = "/login"; }, 500);
        return;
      }
      toast({ title: "Error", description: "Failed to delete item.", variant: "destructive" });
    },
  });

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    addItemMutation.mutate({ item: newItem.trim(), category: selectedCategory, itemType: selectedItemType });
  };

  const personalItems = packingItems.filter((item) => item.itemType === "personal" && item.userId === user?.id);
  const groupItems = packingItems.filter((item) => item.itemType === "group");

  const groupedPersonalItems = personalItems.reduce(
    (acc, item) => {
      const cat = item.category || "general";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, PackingListItem[]>,
  );

  const groupedGroupItems = groupItems.reduce(
    (acc, item) => {
      const cat = item.category || "general";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, PackingListItem[]>,
  );

  const totalPersonalPacked = personalItems.filter((item) => item.isChecked).length;
  const totalGroupHandled = groupItems.filter((item) => item.isChecked).length;
  const totalPacked = totalPersonalPacked + totalGroupHandled;
  const totalItems = personalItems.length + groupItems.length;
  const progressPercent = totalItems > 0 ? Math.round((totalPacked / totalItems) * 100) : 0;

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-[rgba(13,148,136,0.15)] bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-[#0D9488]" />
          <h2 className="font-fraunces text-lg font-semibold text-[#0D3D39]">Packing List</h2>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-[rgba(13,148,136,0.06)]" />
          ))}
        </div>
      </div>
    );
  }

  const renderPersonalItem = (item: PackingListItem) => {
    const isChecked = item.isChecked;
    if (hideCompleted && isChecked) return null;

    return (
      <div
        key={item.id}
        className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
          isChecked
            ? "border-[rgba(13,148,136,0.30)] bg-[rgba(13,148,136,0.06)]"
            : "border-[rgba(13,148,136,0.12)] bg-white hover:border-[rgba(13,148,136,0.25)]"
        }`}
      >
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={() => togglePersonalItemMutation.mutate(item.id)}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              isChecked
                ? "border-[#0D9488] bg-[#0D9488] text-white"
                : "border-[rgba(13,148,136,0.35)] hover:border-[#0D9488]"
            }`}
          >
            {isChecked && (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <span
              className={`block font-medium ${
                isChecked ? "text-[#0D9488] line-through opacity-70" : "text-[#0D3D39]"
              }`}
            >
              {item.item}
            </span>
            {isChecked && (
              <span className="text-xs font-medium text-[#0D9488]">Packed</span>
            )}
          </div>
        </div>
        {user?.id === item.userId && (
          <button
            onClick={() => deleteItemMutation.mutate(item.id)}
            disabled={deleteItemMutation.isPending}
            className="ml-3 rounded-lg p-1.5 text-[rgba(13,61,57,0.35)] transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };

  const renderGroupItem = (item: PackingListItem) => {
    const isChecked = item.isChecked;
    if (hideCompleted && isChecked) return null;

    return (
      <div
        key={item.id}
        className={`flex items-center justify-between rounded-xl border p-4 transition-all ${
          isChecked
            ? "border-[rgba(13,148,136,0.30)] bg-[rgba(13,148,136,0.06)]"
            : "border-[rgba(13,148,136,0.12)] bg-white hover:border-[rgba(13,148,136,0.25)]"
        }`}
      >
        <div className="flex flex-1 items-center gap-3">
          <button
            onClick={() => updateGroupItemStatusMutation.mutate({ itemId: item.id, handled: !isChecked })}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
              isChecked
                ? "border-[#0D9488] bg-[#0D9488] text-white"
                : "border-[rgba(13,148,136,0.35)] hover:border-[#0D9488]"
            }`}
          >
            {isChecked && (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
          <div className="flex-1">
            <span
              className={`block font-medium ${
                isChecked ? "text-[#0D9488] line-through opacity-70" : "text-[#0D3D39]"
              }`}
            >
              {item.item}
            </span>
            <div className="mt-0.5 flex items-center gap-2">
              <span className="text-xs text-[rgba(13,61,57,0.55)]">
                Suggested by {item.user.firstName || item.user.username || "a member"}
              </span>
              {item.groupStatus && (
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    item.groupStatus.checkedCount === item.groupStatus.memberCount
                      ? "bg-[rgba(13,148,136,0.10)] text-[#0D9488]"
                      : "bg-[rgba(13,61,57,0.06)] text-[rgba(13,61,57,0.55)]"
                  }`}
                >
                  {item.groupStatus.checkedCount}/{item.groupStatus.memberCount} handled
                </span>
              )}
            </div>
          </div>
        </div>
        {user?.id === item.userId && (
          <button
            onClick={() => deleteItemMutation.mutate(item.id)}
            disabled={deleteItemMutation.isPending}
            className="ml-3 rounded-lg p-1.5 text-[rgba(13,61,57,0.35)] transition-colors hover:bg-rose-50 hover:text-rose-500"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="rounded-2xl border border-[rgba(13,148,136,0.15)] bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="h-5 w-5 text-[#0D9488]" />
          <h2 className="font-fraunces text-lg font-semibold text-[#0D3D39]">Packing List</h2>
          {totalItems > 0 && (
            <span className="rounded-full bg-[rgba(13,148,136,0.08)] px-2.5 py-0.5 text-xs font-medium text-[#0D9488]">
              {totalPacked}/{totalItems} done
            </span>
          )}
        </div>
        {totalItems > 0 && (
          <button
            onClick={() => setHideCompleted(!hideCompleted)}
            className="text-sm font-medium text-[rgba(13,61,57,0.55)] transition-colors hover:text-[#0D9488]"
          >
            {hideCompleted ? "Show all" : "Hide done"}
          </button>
        )}
      </div>

      {/* Progress bar */}
      {totalItems > 0 && (
        <div className="mb-6">
          <div className="mb-1.5 flex justify-between text-xs text-[rgba(13,61,57,0.55)]">
            <span>Packing progress</span>
            <span className="font-medium text-[#0D9488]">{progressPercent}%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(13,148,136,0.12)]">
            <div
              className="h-full rounded-full bg-[#0D9488] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Add item form */}
      <form onSubmit={handleAddItem} className="mb-8">
        <div className="flex gap-2">
          <Input
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add a packing item..."
            className="flex-1 border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.03)] focus-visible:ring-[#0D9488]/30"
          />
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-32 border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.03)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedItemType} onValueChange={(v: "personal" | "group") => setSelectedItemType(v)}>
            <SelectTrigger className="w-28 border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.03)]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="group">Group</SelectItem>
            </SelectContent>
          </Select>
          <Button
            type="submit"
            disabled={!newItem.trim() || addItemMutation.isPending}
            className="bg-[#0D9488] hover:bg-[#0B7C73]"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-[rgba(13,61,57,0.45)]">
          {selectedItemType === "personal" ? (
            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" /> Personal items are private — only visible to you
            </span>
          ) : (
            "Group items are visible to everyone and each person checks them off independently"
          )}
        </p>
      </form>

      {/* Empty state */}
      {totalItems === 0 && (
        <div className="py-10 text-center">
          <Package className="mx-auto mb-3 h-10 w-10 text-[rgba(13,148,136,0.25)]" />
          <h3 className="mb-1 font-fraunces text-base font-semibold text-[#0D3D39]">No items yet</h3>
          <p className="text-sm text-[rgba(13,61,57,0.55)]">
            Add personal items only you need, or group reminders like passports.
          </p>
        </div>
      )}

      {totalItems > 0 && (
        <div className="space-y-8">
          {/* Personal items */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Lock className="h-4 w-4 text-[#0D9488]" />
              <h3 className="text-sm font-semibold text-[#0D3D39]">My Items</h3>
              <span className="text-xs text-[rgba(13,61,57,0.55)]">private</span>
              <span className="ml-auto rounded-full bg-[rgba(13,148,136,0.08)] px-2 py-0.5 text-xs font-medium text-[#0D9488]">
                {totalPersonalPacked}/{personalItems.length}
              </span>
            </div>

            {personalItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(13,148,136,0.20)] py-5 text-center">
                <p className="text-sm text-[rgba(13,61,57,0.45)]">No personal items — add things only you need</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => {
                  const items = groupedPersonalItems[category.value] || [];
                  const visible = hideCompleted ? items.filter((i) => !i.isChecked) : items;
                  if (items.length === 0) return null;
                  if (visible.length === 0 && hideCompleted) return null;
                  return (
                    <div key={category.value}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded-full border border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.06)] px-2.5 py-0.5 text-xs font-medium text-[#0D9488]">
                          {category.label}
                        </span>
                        <span className="text-xs text-[rgba(13,61,57,0.45)]">
                          {items.filter((i) => i.isChecked).length}/{items.length}
                        </span>
                      </div>
                      <div className="space-y-2">{visible.map(renderPersonalItem)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Group items */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <Package className="h-4 w-4 text-[#0D9488]" />
              <h3 className="text-sm font-semibold text-[#0D3D39]">Group Items</h3>
              <span className="text-xs text-[rgba(13,61,57,0.55)]">everyone checks independently</span>
              <span className="ml-auto rounded-full bg-[rgba(13,148,136,0.08)] px-2 py-0.5 text-xs font-medium text-[#0D9488]">
                {totalGroupHandled}/{groupItems.length}
              </span>
            </div>

            {groupItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[rgba(13,148,136,0.20)] py-5 text-center">
                <p className="text-sm text-[rgba(13,61,57,0.45)]">No group items — add shared reminders like passports</p>
              </div>
            ) : (
              <div className="space-y-3">
                {categories.map((category) => {
                  const items = groupedGroupItems[category.value] || [];
                  const visible = hideCompleted ? items.filter((i) => !i.isChecked) : items;
                  if (items.length === 0) return null;
                  if (visible.length === 0 && hideCompleted) return null;
                  return (
                    <div key={category.value}>
                      <div className="mb-1.5 flex items-center gap-2">
                        <span className="rounded-full border border-[rgba(13,148,136,0.20)] bg-[rgba(13,148,136,0.06)] px-2.5 py-0.5 text-xs font-medium text-[#0D9488]">
                          {category.label}
                        </span>
                        <span className="text-xs text-[rgba(13,61,57,0.45)]">
                          You: {items.filter((i) => i.isChecked).length}/{items.length} handled
                        </span>
                      </div>
                      <div className="space-y-2">{visible.map(renderGroupItem)}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
